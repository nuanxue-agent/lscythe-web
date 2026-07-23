---
title: gradle-sentinel
description: a Gradle plugin that detects configuration cache poisoning, unused task outputs, and incremental compilation regressions
longDescription: gradle-sentinel runs as part of your build and reports issues that slow down builds over time - configuration cache violations, tasks with outputs that are never consumed, incremental compilation degradation, and plugin misconfiguration. it's a linter for your gradle build.
tags: [gradle, build-systems, kotlin, android, performance]
repo: https://git.lscythe.dev/lscythe/gradle-sentinel
status: completed
year: "2025"
featured: false
---

gradle builds get slower over time. not because gradle itself regresses - because engineers add plugins, introduce new modules, and make changes that break incrementality without noticing. the feedback loop is too slow: you add a dependency, the build is 5 seconds slower, and you ship it. three months later the build is 90 seconds slower and nobody remembers why.

gradle-sentinel is a plugin that makes these regressions visible.

## what it detects

**configuration cache poisoning** - the configuration cache is gradle's biggest performance win for incremental builds. but it's fragile. if your build logic reads a file directly, accesses `System.getenv()`, or does other things that shouldn't happen during configuration, you poison the cache. gradle-sentinel detects these violations at build time and reports them.

**unused task outputs** - tasks that run and produce outputs that no other task consumes. this usually happens when someone removes a consumer but forgets to remove the producing task. the task keeps running on every build, doing useless work.

**incremental compilation breaks** - kotlin's incremental compiler is good but brittle. certain code patterns - inline functions with default arguments, annotation processor changes - can break incrementality. gradle-sentinel monitors kotlin compilation metrics and alerts when a module that should be incremental is doing full recompilations.

**plugin misconfiguration** - plugins that register tasks incorrectly, tasks that declare the wrong inputs or outputs, and other configuration mistakes that break build caching.

## how it works

gradle-sentinel registers a `BuildListener` that hooks into gradle's task execution lifecycle. after each build, it analyzes the task graph, checks for known antipatterns, and writes a report.

the report is a structured JSON file that can be parsed by CI systems or rendered as HTML for local viewing. on CI, we fail the build if certain thresholds are exceeded - for example, if more than 10% of kotlin compilations are full recompilations when they should be incremental.

## key technical decisions

**build-time analysis, not static analysis** - gradle-sentinel runs during actual builds, not as a separate linting step. this lets it observe real task execution behavior, not just the declared configuration. the downside is that it adds a small amount of overhead to every build. in practice, the overhead is negligible - under 200ms for most projects.

**thresholds are configurable** - different projects have different tolerance for build performance. gradle-sentinel lets you configure thresholds in `gradle.properties`. for example, `sentinel.maxFullCompilations=5` fails the build if more than 5 kotlin modules did full recompilations.

**integration with gradle enterprise** - if your project uses gradle enterprise for build caching, gradle-sentinel can pull additional metrics from the build scan API and correlate them with detected issues. this makes it easier to track down the root cause of cache misses.

## impact

i deployed gradle-sentinel at nocturn in Q3 2025. within two weeks we'd identified and fixed three configuration cache violations and removed four tasks that were running on every build but consuming no outputs. clean build time dropped from 4m 20s to 3m 45s. incremental build time dropped from 1m 10s to 52s.

the ongoing value is that it prevents regressions. we have CI checks that fail if sentinel detects new issues. this forces the conversation about build performance to happen at PR time, not three months later when the build is noticeably slower.

## current status

completed. stable. in production at nocturn. the project is open-sourced but documentation is minimal. i've been meaning to write a proper guide, but honestly, the code is well-commented and the plugin is simple enough that reading the source is probably faster than reading docs.
