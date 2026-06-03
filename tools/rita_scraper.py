#!/usr/bin/env python3
"""
RITA nomenclature downloader + parser — Scrapling-based.

Usage:
    python rita_scraper.py --chapter 85          # download from web
    python rita_scraper.py --file chapter_85.xml # parse local XML file

Output (stdout): JSONL — one JSON object per nomenclature row, e.g.:
    {"code":"8501000000","parentCode":"8500000000","description":"Moteurs...","alinea":0,"type":0,"chapter":85,"validAt":"2026-05-28"}

Errors: non-zero exit code + message on stderr.

The caller (Node.js RitaSyncService.ts) reads the JSONL lines and bulk-inserts into DB.
"""

import argparse
import json
import sys
import xml.etree.ElementTree as ET
from datetime import date
from pathlib import Path

BASE_URL = "https://www.douane.gouv.fr/rita-encyclopedie/public/experts/telechargements/init.action"


def download_xml(chapter: int) -> bytes:
    from scrapling.fetchers import FetcherSession

    with FetcherSession(impersonate="chrome") as session:
        session.get(BASE_URL, stealthy_headers=True, timeout=30)

        data = {
            "expertsTelechargementsConversation.typeService": "",
            "expertsTelechargementsConversation.formatExport": "XML",
            "expertsTelechargementsConversation.chapitreCritere.code": str(chapter).zfill(2),
            "exportNomenc": "Télécharger",
        }

        resp = session.post(BASE_URL, data=data, stealthy_headers=True, timeout=90)

        if resp.status != 200:
            raise RuntimeError(f"HTTP {resp.status} for chapter {chapter}")

        ct = resp.headers.get("content-type", "")
        if "xml" not in ct and not resp.body.lstrip()[:5] == b"<?xml":
            raise RuntimeError(
                f"Unexpected content-type '{ct}' for chapter {chapter} — expected XML"
            )

        return resp.body


def parse_rows(xml_bytes: bytes, chapter: int) -> list[dict]:
    """
    Parse the RITA XML and derive parentCode via a stack based on Alinea depth.
    Each row becomes: {code, parentCode, description, alinea, type, chapter, validAt}
    """
    root = ET.fromstring(xml_bytes)

    valid_at = date.today().strftime("%Y-%m-%d")
    caract = root.find("caracteristiques")
    if caract is not None:
        date_el = caract.find("date_table")
        if date_el is not None and date_el.text:
            raw = date_el.text.strip()  # e.g. "20260528"
            if len(raw) == 8:
                valid_at = f"{raw[:4]}-{raw[4:6]}-{raw[6:]}"  # "2026-05-28"

    contenu = root.find("contenu")
    if contenu is None:
        # Some chapters are reserved in the nomenclature and have no content (e.g. chapter 77)
        return []

    rows: list[dict] = []
    # stack holds (alinea, code) of the current ancestor chain.
    # stack[0] is always the chapter root (the first row, alinea=0).
    stack: list[tuple[int, str]] = []

    for ligne in contenu.findall("ligne"):
        code_el = ligne.find("Code")
        desc_el = ligne.find("Description")
        alinea_el = ligne.find("Alinea")
        type_el = ligne.find("Type")

        if code_el is None or code_el.text is None:
            continue

        code = code_el.text.strip()
        description = (desc_el.text or "").strip() if desc_el is not None else ""
        alinea = int(alinea_el.text.strip()) if alinea_el is not None and alinea_el.text else 0
        row_type = int(type_el.text.strip()) if type_el is not None and type_el.text else 0

        # RITA sometimes uses the same code at two consecutive alinea levels:
        # the first occurrence is a descriptive label, the second is the actual code.
        # Remove any previous stack entry for this code so the second occurrence
        # is treated as a fresh node at the correct depth.
        stack = [(a, c) for a, c in stack if c != code]

        if not stack:
            # First row is always the chapter root — no parent
            parent_code = None
            stack.append((alinea, code))
        elif alinea == 0:
            # All subsequent alinea=0 nodes are headings: direct children of the chapter root.
            # Keep the chapter root at stack[0] and reset the rest.
            chapter_root = stack[0]
            parent_code = chapter_root[1]
            stack = [chapter_root, (alinea, code)]
        else:
            # Normal depth: pop until we find a node with strictly smaller alinea.
            while stack and stack[-1][0] >= alinea:
                stack.pop()
            parent_code = stack[-1][1] if stack else None
            stack.append((alinea, code))

        rows.append({
            "code": code,
            "parentCode": parent_code,
            "description": description,
            "alinea": alinea,
            "type": row_type,
            "chapter": chapter,
            "validAt": valid_at,
        })

    # RITA sometimes repeats the same code at different alinea levels.
    # Keep the last occurrence per code to avoid PK conflicts in the same INSERT batch.
    seen: dict[str, int] = {}
    for i, row in enumerate(rows):
        seen[row["code"]] = i
    rows = [rows[i] for i in sorted(seen.values())]

    return rows


def main() -> None:
    parser = argparse.ArgumentParser(description="Download and parse a RITA chapter as JSONL")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--chapter", type=int, help="Chapter number (1-99), downloaded from web")
    group.add_argument("--file", type=str, help="Path to a local RITA XML file")
    args = parser.parse_args()

    sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]

    if args.file:
        file_path = Path(args.file)
        if not file_path.exists():
            print(f"ERROR: File not found: {args.file}", file=sys.stderr)
            sys.exit(1)
        # Infer chapter from filename: chapter_01.xml → 1
        chapter = args.chapter or 0
        try:
            stem = file_path.stem  # e.g. "chapter_01"
            chapter = int(stem.split("_")[-1])
        except ValueError:
            print(f"ERROR: Cannot infer chapter from filename '{file_path.name}'", file=sys.stderr)
            sys.exit(1)

        try:
            xml_bytes = file_path.read_bytes()
        except Exception as e:
            print(f"ERROR reading file {args.file}: {e}", file=sys.stderr)
            sys.exit(1)
    else:
        chapter = args.chapter
        if not 1 <= chapter <= 99:
            print(f"Chapter must be between 1 and 99, got {chapter}", file=sys.stderr)
            sys.exit(1)

        try:
            xml_bytes = download_xml(chapter)
        except Exception as e:
            print(f"ERROR downloading chapter {chapter}: {e}", file=sys.stderr)
            sys.exit(1)

    try:
        rows = parse_rows(xml_bytes, chapter)
    except Exception as e:
        print(f"ERROR parsing chapter {chapter}: {e}", file=sys.stderr)
        sys.exit(1)

    for row in rows:
        sys.stdout.write(json.dumps(row, ensure_ascii=False) + "\n")

    print(f"chapter {chapter}: {len(rows)} rows", file=sys.stderr)


if __name__ == "__main__":
    main()
