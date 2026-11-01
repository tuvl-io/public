# Contributing

This repository is the tuvl.io portal. Changes are licensed under Apache-2.0 and need a sign-off
(`git commit -s`, see the [Developer Certificate of Origin](https://developercertificate.org/)).

## Branches

All work happens on `develop`: branch from it, open the pull request against it, and CI builds the portal.
`main` is what is live at tuvl.io. It only takes a pull request from `develop`, merged with a **merge commit**
(not a squash), and CI refuses any other head branch. The merge deploys the site (`deploy-pages.yml`), including the
docs mirror at tuvl.io/docs, which is built from the `main` branch of the docs repository.

Say what a release number or install command on the page refers to only once that release is on PyPI.

## Develop

```bash
pnpm install
pnpm dev          # local preview
pnpm run build    # what CI runs
```
