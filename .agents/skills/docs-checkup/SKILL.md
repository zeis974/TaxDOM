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
- **`AGENTS.md` keeps only non-derivable claims.** Versions, the script list and the directory
  layout are read straight from `package.json`, `biome.json` and the tree — they were dropped on
  purpose. Don't reintroduce a Stack or Architecture section: a claim derivable from a file
  belongs in that file, not here.
- **Verify, don't recall.** Read the actual file/config for every claim before deciding it's
  accurate or stale. A claim that sounds right is not the same as one you checked this run.
- Drop a bullet that's no longer true instead of leaving it stale — don't rewrite sections that
  are still accurate just to touch them.

## Procedure

### 1. `AGENTS.md`

- **Commands** — diff the `## Commands` block against `scripts` in root + every
  `apps/*/package.json` and against the `ace` commands in `apps/api/commands/`. Flag any documented
  command that no longer exists. Keep a script only when it carries a non-derivable prerequisite,
  ordering or side effect (container `taxdom_db`, `*_test` database, `db:push` vs migrations); a
  bare mirror of a script is noise. Re-read each inline comment too — image, port, limiter store —
  that's where drift hides.
- **No-CI claim** — `.github/workflows` is still absent, and root `package.json` still has no
  `typecheck` script. If either changes, update the gotcha instead of dropping it silently.
- **Framework pointers** — the Next.js bullet names `apps/web/node_modules/next/dist/docs/` and
  `agentRules: false` in `next.config.ts`. Confirm the directory exists after install and that
  the option is still part of `NextConfig`
  (`grep agentRules apps/web/node_modules/next/dist/server/config-shared.d.ts`). With
  `agentRules` disabled, nothing regenerates that guidance on a Next upgrade: this check is the
  only thing keeping the pointer true.
- **Key gotchas** — re-verify each bullet against its actual source: `.gitignore` /
  `apps/*/.gitignore`, `biome.json` excludes, `adonisrc.ts` hooks, `packages/ui/preset.js` **and**
  each app's `panda.config.ts` for the Panda claim, route directories, the auth-schema generation
  script. A gotcha naming a dependency that's installed but never wired into config (no config
  flag, no import) is stale — remove it, don't leave it as aspirational.
- **Trailing pointers** (`docs/STYLING.md`, `docs/COMMITS.md`, `DESIGN.md`) still exist at those
  paths, and `pnpm design:lint` still lints `DESIGN.md`. Its Overview still names the right stack
  for web, dashboard and blog — `design:lint` checks structure and tokens, never prose.

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

- **Scope list** (§2) matches the current `apps/*` and `packages/*` directory names, plus
  `.agents/skills`.
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

- Re-adding a Stack, Architecture or script-list section to `AGENTS.md` — it's derivable from
  `package.json`, `biome.json` or the tree.
- Trusting an old backlog count in `STYLING.md` instead of regenerating it.
- Editing `CLAUDE.md` directly instead of `AGENTS.md`.
- "Fixing" a `docs/COMMITS.md` example by inventing a plausible commit instead of checking
  `git log`.
