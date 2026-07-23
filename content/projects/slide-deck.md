---
title: slide-deck
description: a compose multiplatform presentation framework for technical talks.
longDescription: slide-deck is a CuP (Compose ur Pres) template project for building and delivering technical presentations in Kotlin with Compose Multiplatform — runs on desktop and exports to the web.
tags: [kotlin, compose-multiplatform, kmp, presentations]
repo: https://github.com/lscythe/slide-deck
url: https://lscythe.github.io/slide-deck/
status: completed
year: "2026"
featured: false
---

## what it is

A presentation built with [Compose ur Pres (CuP)](https://github.com/KodeinKoders/CuP) — a Kotlin Multiplatform framework that lets you write slides as Composable functions and run them on desktop (with Compose Hot Reload for live editing) or export them as a web page for sharing.

The appeal: write your technical presentation in the same language and tooling as your app, with full access to Compose's layout and animation primitives. No more fumbling between presentation software and your IDE during a talk.

## how it works

Slides are Kotlin functions. Each slide is declared in `src/commonMain/kotlin/slides/`, registered in `main.kt`, and rendered by the CuP engine. Themes, transitions, and speaker notes are all configured in code.

Run locally with `./gradlew hotRunJvm` for Compose Hot Reload — changes appear instantly without recompiling. Export to web with `./gradlew composeCompatibilityBrowserDistribution` for a shareable static page.

## deployment

GitHub Actions handles the web export automatically on every push to main, deploying to GitHub Pages.
