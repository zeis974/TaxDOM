---
name: docs-checkup
description: Use when AGENTS.md, docs/COMMITS.md, or docs/STYLING.md might be stale — before a docs PR, after dependency bumps, app/package restructuring, route or config changes, or design-token edits, or whenever asked to audit or update these three files.
---

# Docs Checkup

## Overview

`AGENTS.md`, `docs/COMMITS.md`, and `docs/STYLING.md` are the source of truth agents read
before touching this repo. Code changes silently invalidate their claims — a version bump, a
renamed script, a moved directory, a deleted token. This skill re-derives every checkable claim
in those three files from the actual repo state and fixes what's drifted.

## Rules

- **Never edit `CLAUDE.md`.** It is `@AGENTS.md`, a pointer only — all content changes go in
  `AGENTS.md`.
- **`AGENTS.md` pins major versions only** (`pnpm 11`, `TypeScript 7`, `Biome 2` — not
  `11.24.0`, `7.0.2`, `2.5.10`).
- **Verify, don't recall.** Read the actual file/config for every claim before deciding it's
  accurate or stale. A claim that sounds right is not the same as one you checked this run.
- Drop a bullet that's no longer true instead of leaving it stale — don't rewrite sections that
  are still accurate just to touch them.

## Procedure

### 1. `AGENTS.md`

- **Stack versions** — compare against root `package.json` (`engines`, `packageManager`) and
  each `apps/*/package.json`'s key deps. Major only.
- **Commands** — diff the `## Commands` block against `scripts` in root + every
  `apps/*/package.json`. Flag any script missing from the doc and any documented command that no
  longer exists.
- **Architecture** — for each `apps/*` and `packages/*` entry, confirm the `package.json`
  `"name"`, the framework + major version, and the path still exist. Check for new or removed
  top-level apps/packages, and for paths that moved (e.g. a data directory relocating under
  `tools/`).
- **Key gotchas** — re-verify each bullet against its actual source: `.gitignore` /
  `apps/*/.gitignore`, `biome.json` excludes, `adonisrc.ts` hooks, each app's `panda.config.ts`,
  route directories, the auth-schema generation script. A gotcha naming a dependency that's
  installed but never wired into config (no config flag, no import) is stale — remove it, don't
  leave it as aspirational.
- **Trailing pointers** (`docs/STYLING.md`, `docs/COMMITS.md`) still exist at those paths.

```bash
# every script across the workspace
for f in package.json apps/*/package.json; do
  echo "== $f =="
  python3 -c "import json;print('\n'.join(json.load(open('$f')).get('scripts',{})))"
done

# biome excludes
python3 -c "import json;print(json.load(open('biome.json'))['files']['includes'])"
```

### 2. `docs/COMMITS.md`

- **Scope list** (§2) matches the current `apps/*` and `packages/*` directory names.
- **Example commits** (§2) still point at real commits: `git log --oneline | grep -F "<subject>"`.
  Replace any that were reverted or squashed away with a current example.
- **Types table** still matches actual usage:
  `git log --format=%s | grep -oE '^[a-z]+' | sort -u`, compared against the table — flag a type
  in real use that's missing from the table, or a documented type nothing ever uses.

### 3. `docs/STYLING.md`

- **Token catalogue** vs `packages/ui/theme/semantic-tokens.ts`, `tokens.ts`, `keyframes.ts` —
  every count claim ("22 semantic tokens", the spacing/radii/typography rows) must match the
  actual exports, not the last time someone counted.
- **Backlog counts** (raw spacing/radius values, missing `focus-visible`) are point-in-time and
  drift fast — regenerate them with the two commands in STYLING.md §9 rather than trusting the
  written numbers.
- **Code vs `DESIGN.md`** — STYLING.md states code in `packages/ui/theme/` wins on conflict; spot
  check a handful of values rather than diffing every one.

```bash
# reuse from STYLING.md §9
grep -rhoE 'token(\.var)?\(["'"'"']?colors\.[a-zA-Z0-9]+' apps/*/src \
  | sed -E 's/.*colors\.//' | sort -u
grep -rnE '^\s*(gap|padding|margin|border-radius)[^;]*[0-9]+px' apps/*/src \
  --include='*.tsx' | grep -v 'token('
```

## Output

Report per finding: `file → section → what's stale → fix applied` (or, if it's a judgment call —
e.g. a gotcha that looks unused rather than provably dead — flag it for the user instead of
deciding unilaterally). Skip sections with nothing to report; don't pad the summary.

## Common mistakes

- Pinning a minor/patch version in `AGENTS.md` — majors only.
- Trusting an old backlog count in `STYLING.md` instead of regenerating it.
- Editing `CLAUDE.md` directly instead of `AGENTS.md`.
- "Fixing" a `docs/COMMITS.md` example by inventing a plausible commit instead of checking
  `git log`.
