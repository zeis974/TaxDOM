#!/usr/bin/env python3
"""
Download all RITA chapters (1-99) as XML files to data/rita/xml/.

Usage:
    python tools/download_rita.py                  # download all 99 chapters
    python tools/download_rita.py --chapter 85     # single chapter
    python tools/download_rita.py --from 1 --to 10 # range

Output dir: data/rita/xml/chapter_XX.xml (relative to project root)
"""

import argparse
import io
import sys
import time
from pathlib import Path

# Force UTF-8 output on Windows (avoids charmap errors for special chars in Scrapling logs)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

BASE_URL = "https://www.douane.gouv.fr/rita-encyclopedie/public/experts/telechargements/init.action"
PROJECT_ROOT = Path(__file__).parent.parent
OUTPUT_DIR = PROJECT_ROOT / "data" / "rita" / "xml"


def download_chapter_xml(chapter: int) -> bytes:
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
            raise RuntimeError(f"HTTP {resp.status}")

        ct = resp.headers.get("content-type", "")
        if "xml" not in ct and not resp.body.lstrip()[:5] == b"<?xml":
            raise RuntimeError(f"Unexpected content-type '{ct}' — expected XML")

        return resp.body


def main() -> None:
    parser = argparse.ArgumentParser(description="Download RITA chapters as XML files")
    parser.add_argument("--chapter", type=int, help="Download a single chapter")
    parser.add_argument("--from", dest="from_chapter", type=int, default=1)
    parser.add_argument("--to", dest="to_chapter", type=int, default=99)
    parser.add_argument("--skip-existing", action="store_true", default=True,
                        help="Skip chapters already downloaded (default: true)")
    parser.add_argument("--force", action="store_true", help="Re-download existing files")
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    chapters = [args.chapter] if args.chapter else list(range(args.from_chapter, args.to_chapter + 1))
    skip_existing = args.skip_existing and not args.force

    print(f"Output dir: {OUTPUT_DIR}")
    print(f"Chapters to download: {len(chapters)}")
    if skip_existing:
        print("Skipping already-downloaded files (use --force to re-download)")
    print()

    success = 0
    skipped = 0
    failed = []

    for chapter in chapters:
        out_file = OUTPUT_DIR / f"chapter_{str(chapter).zfill(2)}.xml"

        if skip_existing and out_file.exists():
            size = out_file.stat().st_size
            print(f"  [skip] chapter {chapter:02d} — {out_file.name} ({size:,} bytes)")
            skipped += 1
            continue

        print(f"  [dl]   chapter {chapter:02d} ...", end=" ", flush=True)
        try:
            xml_bytes = download_chapter_xml(chapter)
            out_file.write_bytes(xml_bytes)
            print(f"OK ({len(xml_bytes):,} bytes → {out_file.name})")
            success += 1
            # Brief pause to avoid hammering the server
            time.sleep(0.5)
        except Exception as e:
            print(f"FAILED — {e}")
            failed.append((chapter, str(e)))

    print()
    print(f"Done: {success} downloaded, {skipped} skipped, {len(failed)} failed")
    if failed:
        print("Failed chapters:")
        for ch, err in failed:
            print(f"  chapter {ch:02d}: {err}")
        sys.exit(1)


if __name__ == "__main__":
    main()
