---
name: update-deps-commit
description: Use when committing an automated dependency bump in this repo — after dependency versions are updated and before committing, or when asked to generate the "Update dependencies" commit message, list dependency version changes, or prepare that commit. Derives the version-gap list from the manifest diff. Not for hand-authored commits.
---

# Update dependencies commit

## Overview

Dependency bumps in this repo are committed with the subject `Update dependencies` and a body
listing every dependency whose version changed, one line per package:

```
Update dependencies

Bump pnpm@11.28.0

Update @astrojs/mdx from 7.0.8 to 8.0.0
Update @biomejs/biome from 2.5.10 to 2.5.11
…
Update zod from 4.4.3 to 4.5.4
```
`docs/COMMITS.md` §1.3 exempts automated commits like this one from the "one line, no body" rule,
so the subject stays type-less. Derive the body from the **current diff only** — never from memory
or a previous commit message (past ones have contained typos and omissions; see Common mistakes).

## Procedure

### 1. Sync the lockfile, then read the diff

The message must describe the state you are about to commit, so get the manifests and
`pnpm-lock.yaml` consistent **before** building the list. Running the install can also rewrite the
root `packageManager` field (a pnpm self-update), which is exactly where the `Bump pnpm@…` note
comes from — so it must be read after this step:

```bash
pnpm install
git diff HEAD -- '**/package.json' 'package.json' 'pnpm-workspace.yaml'
```

Work only from the `-`/`+` lines inside the four dependency fields: `dependencies`,
`devDependencies`, `peerDependencies`, `optionalDependencies`. If `pnpm install` changed
`pnpm-lock.yaml`, that file belongs in the commit.

### 2. Build the version-gap list

For every dependency whose version string changed, record `name → (from, to)` using the **exact**
specifier as it appears in the manifest — keep `^`, `~`, or none (e.g. `^26.3.0` → `^26.4.0`, or
`^5.11.0` → `5.11.1` when the caret was dropped).

- **Deduplicate** across workspaces: one line per package name.
- If the same package ends up on different versions in different workspaces, keep a **single**
  line using the **most up-to-date** target version — the occurrence with the highest `to`
  (highest `from` as tie-breaker) — and drop the other occurrences. The package is listed once.

### 3. Additions and removals

- `Add <name>` — a dependency absent from every manifest at `HEAD` and present now.
- `Remove <name>` — a dependency present at `HEAD` and gone from every manifest.
- A package both added somewhere and bumped elsewhere is an `Update`, not an `Add`.

### 4. Tooling notes

- `Bump pnpm@<version>` if the root `packageManager` field changed.
- `Set minimum release date to <N> day(s)` if `minimumReleaseAge` in `pnpm-workspace.yaml` changed
  (value is in minutes: divide by 1440, round up, pluralize).
- Any other changed `pnpm-workspace.yaml` key outside `packages`, `catalog`, `catalogs` and
  `allowBuilds`: `Update pnpm config <key> to <value>`.

### 5. Format

Sort every `Update` / `Add` / `Remove` line in **alphabetical order (A→Z)** by package name.
Because `@` sorts before letters, scoped packages (`@tanstack/…`) come first, then unscoped names —
the same order as the existing `Update dependencies` commits. One blank line between the subject,
the tooling notes and each block:

```
Update dependencies

Bump pnpm@11.28.0

Set minimum release date to 1 day

Update @astrojs/mdx from 7.0.8 to 8.0.0
Update @biomejs/biome from 2.5.10 to 2.5.11

Add some-new-pkg

Remove old-pkg
```

Omit any block that would be empty. No trailing period, no other prose.

### 6. Verify before showing

Check the generated list against the diff line by line: every `from` must match a removed (`-`)
specifier, every `to` an added (`+`) specifier, and no changed dependency may be missing. Fix the
list rather than showing a best-effort one.

### 7. Commit, after the user approves

Show the message and wait for approval. Then stage **only** the files this commit concerns and
commit via a temporary file so the blank lines survive:

```bash
git add -- $(git diff --name-only HEAD -- '**/package.json' 'pnpm-workspace.yaml') pnpm-lock.yaml
git commit -F <temp-file>
```

Never `git add -A` — the working tree may hold unrelated changes.

## Common mistakes

- Listing a dependency whose version did not change (a moved or newly added entry) — only real
  version gaps belong in the list.
- Using the installed or lockfile version instead of the specifier written in `package.json`.
- Building the list before `pnpm install` — the install can bump `packageManager` (missing the
  `Bump pnpm@…` line) and rewrite the lockfile.
- Grouping by workspace, or any order other than alphabetical — the list is flat and A→Z.
- Listing the same package twice when it appears in several workspaces — keep one line with the
  most up-to-date version.
- Forgetting the `Bump pnpm@…`, `Add …` or `Remove …` blocks.
- Hand-"fixing" a `from`/`to` instead of re-reading it from the diff, or copying a previous
  commit's body (past messages have contained typos like `from fom` and missing bumps).
- Committing unrelated files.
