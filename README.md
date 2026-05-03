# Seb Builds

Personal builder website for Sebastian, hosted at `sebmer.com`.

## Content

Content is public, folder-based JSON:

- Projects: `public/content/projects/index.json` plus one JSON file per long-form project.
- Logs: `public/content/logs/index.json` plus one JSON file per short build log.

The folder implies the content type. Projects render as long-form Markdown pages at `/projects/[slug]`. Logs stay short and render on `/logs`.

## CLI

The repo can be run directly as a GitHub-sourced CLI with `npx`:

```bash
npx github:sebmer-com/sebbuilds
npx github:sebmer-com/sebbuilds ls ./projects --all
npx github:sebmer-com/sebbuilds cat ./projects/elson-ai.md
npx github:sebmer-com/sebbuilds tail -f ./build.log
```

For local testing, point the CLI at a running local site:

```bash
SEB_BUILDS_BASE_URL=http://127.0.0.1:3000 node packages/cli/bin/seb-builds.mjs ls ./projects --all
```

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## License

MIT © 2026 Sebastian Mertens
