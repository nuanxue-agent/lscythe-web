---
title: devctx
description: a tui and cli for saving development context snapshots across workspaces.
longDescription: devctx lets you snapshot your current development context — open files, terminal state, notes, branch, todos — and restore it later. Built for the context-switching reality of working across multiple projects.
tags: [kotlin, cli, tui, developer-tools]
repo: https://git.lscythe.dev/lscythe/devctx
status: active
year: "2026"
featured: true
---

## the problem

Switching between projects means losing context. You come back to something after a week and spend the first hour figuring out where you left off.

`devctx` snapshots that context and makes it restorable in one command.

## how it works

Run `devctx save` before you switch away. Run `devctx restore` when you come back. The snapshot includes your current branch, uncommitted changes summary, open editor files (if your editor supports it), and any notes you attach.

## technical decisions

Built in Kotlin with a terminal UI powered by Mordant. Snapshots are stored as plain YAML files in `~/.devctx/` — human-readable, git-friendly.

The CLI parsing uses kotlinx-cli, which is lighter than most alternatives and has first-class multiplatform support for the eventual desktop app.
