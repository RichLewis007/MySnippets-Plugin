# Changelog

All notable changes to this repository are documented in this file.

## Unreleased - 2025-11-18

### Added
- `.github/copilot-instructions.md` — concise, project-specific guidance for AI coding agents (architecture, key files, build commands, patterns, and examples).
- `CONTRIBUTING.md` — short developer guide covering lockfile policy, build commands (`npm run dev`, `npm run build`), and local Obsidian testing steps.
- `CHANGELOG.md` — this file (you are reading it).

### Changed
- `.gitignore` — expanded ignores to include common Node/TypeScript/Rollup artifacts and editor configs:
  - Added: `.vscode/`, `.rollup.cache`, `.rpt2_cache/`, `dist/`, `build/`, `.cache/`, `*.tsbuildinfo`, `release/`, `releases/`, and others.
  - Removed `package-lock.json` from ignore so the lockfile can be committed (recommended for reproducible installs).

### Notes / Verification
- Files added in this change-set:
  - `.github/copilot-instructions.md`
  - `CONTRIBUTING.md`
  - `CHANGELOG.md`

- Files modified:
  - `.gitignore`

- How to verify locally:
  1. Check working tree: `git status --porcelain` to see the new/modified files.
  2. Install deps: `npm install` (now recommended to commit `package-lock.json`).
  3. Build: `npm run build` (produces `main.js` for Obsidian plugin testing).
  4. Test locally in Obsidian: copy `main.js`, `manifest.json`, `styles.css`, and `assets/` into your vault plugin folder (e.g., `~/.obsidian/plugins/mysnippets-plugin/`) and reload the plugin in Obsidian.
