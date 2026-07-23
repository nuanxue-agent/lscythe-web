---
title: lyra
description: a kotlin multiplatform app targeting android and desktop jvm.
longDescription: Lyra is a KMP project exploring shared business logic between Android and Desktop, built with Compose Multiplatform and a clean multi-module architecture.
tags: [kotlin, kmp, compose-multiplatform, android, desktop]
repo: https://github.com/lscythe/lyra
status: active
year: "2026"
featured: true
---

## the project

Lyra is my primary KMP learning ground — a real app with a real architecture, not a toy demo. The goal is to understand where KMP's shared logic actually holds up in practice and where the platform boundaries force you to write `expect/actual`.

The project targets Android and Desktop JVM via Compose Multiplatform. Business logic, data layer, and most UI live in `commonMain`. Platform-specific implementations — file access, notifications, platform styling — live in their respective source sets.

## architecture

Multi-module setup with `build-logic/` convention plugins. Module structure:

- `core/` — shared primitives, design system, network, database
- `feature/` — per-feature modules with their own `domain`, `data`, and `ui` layers
- `composeApp/` — the platform entry points (Android `Activity`, Desktop `main`)

Each feature module has no direct dependencies on other feature modules. Navigation is handled at the app level via type-safe routes.

## what i've learned

KMP's value is real but uneven. Pure Kotlin business logic shares almost perfectly. The friction shows up at platform APIs — anything touching the filesystem, sensors, or platform UI conventions needs careful `expect/actual` design.

The tooling has improved significantly. The Kotlin plugin for IntelliJ handles multiplatform projects much better than it did a year ago, and compilation times are no longer the blocker they once were.
