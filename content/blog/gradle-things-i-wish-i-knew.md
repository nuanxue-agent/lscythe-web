---
title: gradle things i wish i knew earlier
date: 2026-06-18
description: a collection of non-obvious gradle behaviors that have cost me hours across many projects.
tags: [gradle, android, build]
draft: false
---

Gradle is one of those tools that rewards the people who actually read about it. Most Android developers — myself included for years — just copy-paste build scripts and move on.

Here are the things that clicked for me after too much time debugging.

## configuration vs execution

Gradle has two distinct phases: **configuration** and **execution**. Configuration runs every time you do anything — including just checking what tasks are available. Execution only runs the tasks you asked for.

This matters because code in a task's action block runs at execution time, but code in a task's body runs at configuration time. Getting this backwards is one of the most common sources of build slowness.

## the configuration cache

The configuration cache records the result of the configuration phase so it can be reused on subsequent builds. Builds that hit the cache skip configuration entirely.

The catch: any task that reads something at configuration time that changes between builds (like `System.currentTimeMillis()`, or a non-deterministic file glob) will invalidate the cache every time.

## api vs implementation

`api` leaks the dependency to consumers. `implementation` doesn't. Using `api` everywhere is tempting but it makes incremental compilation useless — every change triggers a full rebuild of everything that depends on your module.

Default to `implementation`. Only use `api` when you genuinely need to expose the type in your own public API.
