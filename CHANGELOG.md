# Changelog

All notable changes to this repository are documented in this file.

## Unreleased - 2025-11-18

### Added

- `.github/copilot-instructions.md` — concise, project-specific guidance for AI coding agents (architecture, key files, build commands, patterns, and examples).
- `CONTRIBUTING.md` — short developer guide covering lockfile policy, build commands (`npm run dev`, `npm run build`), and local Obsidian testing steps.
- `.editorconfig` — repository EditorConfig for consistent formatting.
- `src/main.ts` — migrated plugin entry to standard `src/main.ts` per sample-plugin structure.
- `.github/workflows/eslint.yml` — ESLint workflow for PRs and pushes.
- `.github/workflows/ci.yml` — combined CI workflow (lint + build) with npm caching and artifact upload.
- `.github/workflows/release.yml` — manual release workflow that builds, packages, and creates a draft release.

### Changed

- Migrated to `esbuild` and updated `esbuild.config.mjs` to use `src/main.ts` as the entry.
- Updated TypeScript to a compatible version for `@typescript-eslint` by pinning `typescript@5.3.3` in `package.json`.
- Replaced broad `Function` types and `any` usages across multiple files to satisfy ESLint/TypeScript rules.
- Added ESLint + Prettier configuration and formatting rules; applied `prettier --write` across the codebase.
- Adjusted `.gitignore` to allow committing `dist/` and `package-lock.json` for reproducible builds and releases.

### Notes / Verification

- Key files added/modified in this change-set:
  - `.editorconfig`
  - `src/main.ts`
  - `esbuild.config.mjs`
  - `package.json` (pinned `typescript@5.3.3`)
  - `.github/workflows/eslint.yml`
  - `.github/workflows/ci.yml`
  - `.github/workflows/release.yml`

- How to verify locally:
  1. Check working tree: `git status --porcelain` to see the new/modified files.
  2. Install deps: `npm install` (lockfile updated and committed).
  3. Lint: `npm run lint` (ESLint + Prettier checks).
  4. Build: `npm run build` (produces `dist/main.js` for Obsidian plugin testing).
  5. Test locally in Obsidian: copy `dist/main.js`, `manifest.json`, `styles.css`, and `assets/` into your vault plugin folder (e.g., `~/.obsidian/plugins/mysnippets-plugin/`) and reload the plugin in Obsidian.

### Release policy change

- Replaced automatic version bump workflow with a manual `workflow_dispatch`-triggered release workflow. Releases must be created via the Actions UI and will:
  - Build and package artifacts into `release/assets.zip`.
  - Create a version tag via `npm version` using the selected `semver` input (`patch` by default).
  - Create a **draft** GitHub Release and attach the packaged artifacts. This prevents unexpected tags on every push.

