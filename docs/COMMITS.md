# COMMITS.md — commit & PR conventions

> **This file is the rule.** It applies to every commit and every pull request.
> If a case does not fit within it, change this file first — do not work around it.

---

## 1. The non-negotiables

1. **English only** — commit subjects, PR titles, PR descriptions. No French, anywhere.
2. **Conventional Commits**, semver-flavored: `type(scope): subject`.
3. **One line, no body.** The subject is the whole commit message — no blank line + paragraph
   below it. (Automated commits like Renovate's `Update dependencies` are exempt — they aren't
   authored by hand.)
4. **Imperative mood, lowercase subject, no trailing period.** `fix(select): match options by
   accent-insensitive prefix`, not `Fixed matching.` or `fixes matching`.
   No em-dash (`—`) in the subject — use a colon or split into two commits instead.
5. **One logical change per commit.** A feature spanning types → component → integration is
   several commits, not one. Never a single commit mixing unrelated concerns.
6. **PR title = the commit's `type(scope): subject`** (or the most representative one, for a
   multi-commit PR). **PR body is Markdown, in English**, following the structure in §4.

---

## 2. Commit format

```
type(scope): subject
```

### Types

| Type | Use for |
|---|---|
| `feat` | New user-facing capability |
| `fix` | Bug fix |
| `refactor` | Behavior-preserving restructuring |
| `chore` | Tooling, deps, config, non-code maintenance |
| `docs` | Documentation only |
| `ci` | CI/CD pipeline changes |
| `test` | Adding or fixing tests only |
| `perf` | Performance improvement with no behavior change |
| `style` | Formatting only, no logic change (rare — Biome handles most of this) |

Stick to this list. History contains one-off outliers (`ref`, `launch`, `bump`) — those were
mistakes, not precedent. Don't repeat them.

### Scope

The scope is the app or package the change lives in, taken from the directory structure:

`api`, `web`, `dashboard`, `blog`, `ui`, `types`, `tools`.

For a change concentrated in one component or feature area, narrow the scope to that area
instead: `fix(select): …`, `chore(panda): …`. Prefer the narrower scope whenever one applies —
it's more useful in `git log` than the app-level one.

Omit the scope only for changes that genuinely span the whole repo (e.g. a root `chore:` config
change touching every app equally).

### Examples (from this repo's history)

```
feat(ui): display country flags in origin selects
fix(select): match options by accent-insensitive prefix
refactor(ui): merge `@taxdom/components` into `@taxdom/ui`
chore(tools): RITA pipeline refresh + API sync hardening
```

---

## 3. Splitting work into commits

Don't squash a feature into one commit. Split along natural layers, in the order they build on
each other — for example:

```
feat(types): add CountryFlag mapping
feat(ui): add CountryFlag component
feat(dashboard): render flags in origin select
```

Each commit should build and typecheck on its own where practical. This makes `git log`,
`git bisect`, and review readable — one concern per diff.

---

## 4. Pull requests

- **Title:** the primary commit's `type(scope): subject`. GitHub appends the PR number
  automatically on squash-merge (`(#136)`) — never add it by hand.
- **Body:** Markdown, English, professional tone, structured with `##` headers. Use the sections
  that apply — don't force empty ones:

  - **Explain, don't dump.** Describe the important changes and the reasoning — not a
    file-by-file transcript of the diff. If a bullet only restates a filename or a line the
    reviewer can already see in the diff, cut it.
  - **Important = behavior change, API/contract change, a non-obvious decision, or something a
    reviewer needs to know to review well.** Mechanical stuff (renames, formatting, generated
    files, routine dependency bumps) doesn't need its own bullet.
  - Technical detail is expected — name the actual mechanism (which token, which endpoint, which
    component) — but stay at the level of *what changed and why*, not a walkthrough of the code.

```markdown
## Summary
- What changed, as bullet points. One per logical change.

## Why
Motivation — what problem this solves, what triggered it. Skip for changes whose reason is
obvious from the summary (e.g. a straightforward dependency bump).

## Verification
How it was checked: typecheck, tests run, manual QA steps. Skip for trivial changes.

## Known limitations
Anything deliberately left out or not fully covered. Skip if none.
```

- Reference closing issues with `Closes #NNN` at the end of `## Summary` or `## Why`, not as a
  standalone section.
- Creating the branch and the commits is in scope for an assistant working on this repo; opening
  the PR itself is not — that stays with the repo owner via GitHub's UI or `gh`.
- Before running `gh pr create`, show the drafted PR title and body to the user and wait for
  approval — never create the PR sight unseen, even when opening it has been explicitly
  authorized.

---

## 5. Checklist before committing / opening a PR

- [ ] Commit subject is English, imperative, lowercase, no trailing period, no em-dash.
- [ ] Commit type is one of §2's list — no ad hoc types.
- [ ] Scope matches the app/package/feature area actually touched.
- [ ] No commit body — one line only.
- [ ] Work is split into logical commits, not one bundled diff.
- [ ] PR title mirrors the primary commit.
- [ ] PR body is English Markdown using only the sections from §4 that apply.
