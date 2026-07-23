---
title: gitpulse
description: an android app to manage codebases, review pull requests, and monitor ci pipelines.
longDescription: GitPulse brings your entire development workflow to mobile — browse repositories, review and merge pull requests, track CI/CD status, and monitor distributed builds without opening a laptop.
tags: [kotlin, android, github, ci-cd]
repo: https://github.com/lscythe/gitpulse
status: active
year: "2026"
featured: true
---

## the problem

Reviewing pull requests on mobile has always been second-class. GitHub's mobile app is fine for notifications but clunky for actual code review. When you're away from your desk and something needs a look, you're either squinting at diffs on a phone browser or waiting until you're back at a computer.

GitPulse is an attempt to fix that. Not by replicating a desktop IDE, but by building a mobile-first interface for the parts of code review that actually work on a phone — reading context, checking CI status, approving or requesting changes, leaving comments.

## what it does

Browse your repositories, open pull requests, and see CI status at a glance. Tap into a PR to read the description, review file diffs with syntax highlighting, and leave inline comments. Monitor your distributed CI pipelines without opening a browser.

## technical decisions

Built entirely in Kotlin with Jetpack Compose. The GitHub API is accessed via Ktor with a clean repository layer. CI monitoring is handled through polling with exponential backoff — simple and reliable over WebSockets for this use case.

Architecture follows Clean Architecture with feature modules: `feature:repos`, `feature:pulls`, `feature:ci`, each with their own `domain` and `data` submodules. Gradle convention plugins in `build-logic/` keep build configuration consistent across modules.

Still in active development — the PR diff view and CI dashboard are the current focus.
