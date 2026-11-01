# tuvl.io

The website for [tuvl](https://github.com/tuvl-io/tuvl), the YAML-driven workflow engine for AI agents. It is a single-page React
app built with Vite and deployed to GitHub Pages at [tuvl.io](https://tuvl.io), with the documentation mirrored at
[tuvl.io/docs](https://tuvl.io/docs). The documentation itself lives in [tuvl-io/docs](https://github.com/tuvl-io/docs) and is
published at [tuvl.dev](https://tuvl.dev).

## Run it locally

You need Node.js 22 and [pnpm](https://pnpm.io/) 10.

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm run build    # production build into dist/, what CI runs
pnpm preview      # serve the production build
```

## Layout

| Path | What is in it |
|---|---|
| `src/App.jsx` | The page: the sections in order |
| `src/components/` | One file per section (`Hero`, `Pipeline`, `Problem`, `Compare`, `Faq`, `Cta`, …), plus the navigation, footer and theme toggle |
| `src/data/version.js` | The release shown on the page, the install command, the examples link and the docs base path |
| `src/hooks/`, `src/lib/` | Theme, persona and scroll behaviour; syntax highlighting; page analytics |
| `public/` | Static files copied as they are, including `CNAME` (the `tuvl.io` custom domain) |

Keep what the page says in step with what is published. `src/data/version.js` names a release and an install command:
change them when that release is on PyPI, not before, because the site is live as soon as the change reaches `main`.

## How it is deployed

`main` is what is live. A push to `main` runs [`deploy-pages.yml`](.github/workflows/deploy-pages.yml), which:

1. installs with the frozen lockfile and builds the app with Vite;
2. checks out the `main` branch of [tuvl-io/docs](https://github.com/tuvl-io/docs), builds it with MkDocs and places it under
   `dist/docs/`, so the docs are served same-origin at `tuvl.io/docs`;
3. uploads `dist/` as the Pages artifact and deploys it. The build fails if the `CNAME` file did not survive.

## Branches and pull requests

All work happens on `develop`. Branch from it, open the pull request against it, and CI builds the portal. `main` only takes a
pull request from `develop`, merged with a **merge commit** (not a squash); CI refuses any other head branch, and branch
protection stops direct pushes. See [CONTRIBUTING.md](CONTRIBUTING.md), including the sign-off every commit needs.

## License

Apache License, Version 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
