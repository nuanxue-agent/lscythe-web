---
title: "typeface archive"
description: "a searchable archive of historical typefaces from 1450–1950, with specimen rendering."
longDescription: "five hundred years of type history, rendered live in the browser."
tags: ["typography", "history", "web"]
url: "https://typeface-archive.lscythe.com"
status: "completed"
year: "2024"
featured: true
---

## background

I built this as a personal research tool while studying historical typefaces. It grew into a public archive.

## features

- 340+ typefaces spanning 1450–1950
- Live specimen rendering via CSS `@font-face`
- Filter by period, region, classification
- Downloadable specimen PDFs

## technical notes

All font files are served from R2 via Cloudflare Workers. Metadata is stored in a D1 database and queried at build time for static generation. Specimen PDFs are generated on-demand via Puppeteer running on a Worker.
