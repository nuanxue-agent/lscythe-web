---
title: devctx
description: a tui and cli for saving development context snapshots across workspaces.
longDescription: devctx snapshots your current development context — branch, uncommitted changes, open files, notes — and restores it when you come back. Built for the context-switching reality of working across multiple projects.
tags: [kotlin, cli, tui, developer-tools]
repo: https://git.lscythe.dev/lscythe/devctx
status: active
year: "2026"
featured: true
---

## the problem

Switching between projects means losing context. You come back to something after a week and spend the first hour figuring out where you left off. What were you working on? What was broken? What were you about to try next?

Git gives you the branch and the diff. It doesn't give you the mental state.

## how it works

Run `devctx save` before you switch away. Run `devctx restore` when you come back. The snapshot includes your current branch, uncommitted changes summary, open editor files (if your editor supports it), and any notes you attach at save time.

```
devctx save --note "mid-refactor on the auth module, ViewModel still has the old state pattern"
devctx list
devctx restore auth-refactor-2026-07-10
```

## technical decisions

Built in Kotlin. Terminal UI uses Mordant for rendering — it handles ANSI colors and box drawing cleanly without pulling in a heavy TUI framework. Snapshots are stored as plain YAML files in `~/.devctx/` — human-readable, git-friendly, and easy to inspect or edit manually.

CLI parsing uses kotlinx-cli, which is lighter than most alternatives and has first-class multiplatform support for the eventual desktop app version.
