# lscythe.dev

Personal website — Bauhaus study 04. Built with Next.js 16, file-based content, deployed to Cloudflare Pages.

## stack

- **framework** — Next.js 16 App Router, fully static output
- **content** — markdown files in `content/` with gray-matter frontmatter
- **styling** — plain CSS, Bauhaus design system (`src/app/globals.css`)
- **hosting** — Cloudflare Pages

## local dev

```bash
npm install
npm run dev
```

## cms

All content is managed via markdown files and a small CLI:

```bash
# create a new draft post
npm run cms -- new post "my post title"

# create a new project
npm run cms -- new project "my project name"

# list everything
npm run cms -- list posts
npm run cms -- list projects

# publish a draft
npm run cms -- publish <slug>

# revert to draft
npm run cms -- unpublish <slug>
```

Or call it directly:

```bash
node scripts/cms.mjs new post "my post title"
```

## content structure

```
content/
  blog/
    my-post.md          # date, title, description, tags, draft
  projects/
    my-project.md       # title, description, tags, repo, url, status, year, featured
  about.md
```

### blog frontmatter

```yaml
---
title: my post title
date: 2026-07-23
description: one-line description shown in the list
tags: [kotlin, android]
draft: false
---
```

### project frontmatter

```yaml
---
title: my project
description: short description
longDescription: longer description for the detail page
tags: [kotlin, cli]
repo: https://github.com/lscythe/my-project
url: https://myproject.dev
status: active          # active | completed | archived
year: "2026"
featured: true          # shown on home page
---
```

## deploy to cloudflare pages

1. Push to GitHub
2. In Cloudflare Pages dashboard: connect the repo
3. Set build command: `npm run build:cf`
4. Set output directory: `.vercel/output/static`
5. Set environment variable: `NODE_VERSION = 22`

Or via Wrangler CLI:

```bash
npm run build:cf
npx wrangler pages deploy .vercel/output/static
```

## adding content

1. `npm run cms -- new post "title"` — creates `content/blog/slug.md` as draft
2. Edit the file
3. `npm run cms -- publish slug` — sets `draft: false`
4. Commit and push — Cloudflare Pages auto-deploys
