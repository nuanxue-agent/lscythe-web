---
title: monobase
description: a monorepo template for Kotlin projects with shared build-logic, version catalogs, and pre-configured composite builds
longDescription: monobase is a batteries-included gradle monorepo template for kotlin/android projects. it comes with convention plugins for common module types, a version catalog for dependency management, pre-configured composite builds for multi-project development, and sensible defaults for build caching and incremental compilation.
tags: [gradle, kotlin, android, monorepo, build-systems]
repo: https://git.lscythe.dev/lscythe/monobase
status: completed
year: "2023"
featured: false
---

every time i start a new kotlin project i spend the first day setting up gradle. deciding on a module structure, writing convention plugins, configuring the version catalog, setting up build caching. by the fourth or fifth time, i realized i was copy-pasting the same setup with minor variations.

monobase is that setup, extracted and parameterized.

## what it includes

**convention plugins in buildSrc** - pre-written gradle convention plugins for common module types:
- `kotlin-library` - a pure kotlin library with no android dependencies
- `android-library` - an android library module with compose, hilt, and room pre-configured
- `android-app` - an android application module with signing config, build types, and flavors
- `kmp-library` - a kotlin multiplatform library with android and iOS targets

each plugin applies the standard set of plugins for that module type, configures common settings (compile SDK, kotlin version, lint options), and sets up dependencies via the version catalog.

**version catalog** - a pre-populated `libs.versions.toml` with modern versions of kotlin, compose, hilt, room, coroutines, ktor, and common testing libraries. the catalog uses version references so bumping kotlin updates all kotlin-related dependencies in one place.

**composite builds** - monobase is structured as a composite build with separate gradle projects for `:app`, `:core`, and `:feature-modules`. the root build includes them via `includeBuild()`. this lets you work on multiple projects simultaneously without publishing intermediate artifacts to a repository.

**build caching** - remote build cache is pre-configured with gradle enterprise settings stubbed out. local build cache is enabled by default. the cache configuration is tuned for monorepo performance - outputs are tagged with module paths to maximize cache reuse across branches.

**incremental compilation** - kotlin incremental compilation is enabled with the new classpath snapshot mode. annotation processors are isolated to minimize rebuild scope.

## how you use it

clone the repo, replace the package names, delete the modules you don't need, and start building. the point is not to ship a framework - it's to give you a starting point that's already configured with best practices so you don't waste time googling "how do i set up gradle build cache" for the tenth time.

## opinionated decisions

monobase makes several opinionated decisions:

- **kotlin over groovy** - all build files are kotlin DSL
- **version catalogs over buildSrc constants** - centralized dependency management
- **convention plugins over script plugins** - type-safe, reusable configuration
- **hilt over koin** - based on my team size assumptions (this is the most controversial)

these are good defaults for my use case. if your preferences differ, fork it and change them. that's the point.

## why it's complete, not active

i built this, used it for two projects, and then stopped updating it. not because it's bad - because it's done. the core structure (convention plugins + version catalog + composite builds) is stable. gradle's conventions haven't changed in ways that invalidate the approach.

the version numbers are outdated. kotlin 1.9 is in the catalog; we're on 2.0 now. updating is trivial - change the version number in `libs.versions.toml` and sync. i haven't done it because i'm not using monobase for new projects anymore. i've moved to a more opinionated, company-specific setup that builds on the same principles but adds nocturn-specific conventions.

if you find monobase and want to use it, treat it as a snapshot of a working setup from 2023, not a maintained framework. copy it, update the versions, adjust the conventions to your needs. that's the intended use.
