# Contributing

Short guidelines for contributors and release builds for `MySnippets-Plugin`.

- Lockfile: commit `package-lock.json` (reproducible installs). Do not add it to `.gitignore`.
- Dev workflow:
  - Install: `npm install`
  - Dev (watch + build): `npm run dev` (runs `rollup -w`) — edit TS in `src/`, rollup outputs into `dist/`.
  - Build (production): `npm run build` — produces production `main.js` in `dist/` for releasing.
- Built artifacts policy:
  - Do not commit transient build files (e.g., `main.js`) to `main` or feature branches.
  - For a release, run `npm run build` and attach the built files to a GitHub Release or place them in a `release/` folder that is not committed to source branches (the repo `.gitignore` excludes `release/`).
  - If you prefer to publish built files in the repo (not recommended here), coordinate with maintainers first and update `.gitignore` accordingly.
- Obsidian testing:
  - After `npm run build`, copy `dist/main.js`, `manifest.json`, `styles.css`, and `assets/` into your Obsidian vault plugin folder (e.g., `~/.obsidian/plugins/mysnippets-plugin/`) to test locally.

If unsure about release packaging, open an issue or ask maintainers for the expected release ZIP contents.
