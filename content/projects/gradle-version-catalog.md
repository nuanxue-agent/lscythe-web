---
title: gradle-version-catalog
description: shared catalogs for consistent kotlin and android dependency management.
longDescription: A set of opinionated Gradle version catalogs that pin dependency versions across projects, eliminating the drift that happens when each project manages its own versions.
tags: [gradle, kotlin, android, build]
repo: https://git.lscythe.dev/lscythe/gradle-version-catalog
status: active
year: "2025"
featured: true
---

## why this exists

After maintaining several Kotlin/Android projects simultaneously, I got tired of each one drifting to different versions of the same dependencies. A security fix in OkHttp would get applied to one project and not the others.

The solution: a single source of truth for dependency versions, shared across all projects via Gradle's version catalog feature.

## usage

Add the catalog to your `settings.gradle.kts` and reference dependencies by their catalog aliases. Updates to the catalog propagate to all projects that consume it.

## what's included

Kotlin and KGP, AndroidX core libraries, Compose and Compose Multiplatform, Ktor, coroutines, serialization, testing (JUnit5, Kotest, Turbine), and common Gradle plugin versions.
