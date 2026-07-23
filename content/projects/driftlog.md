---
title: driftlog
description: an Android debug overlay that displays live Gradle build metrics, recomposition counts, and memory pressure in a floating HUD during development
longDescription: driftlog is a debug-only floating HUD for android apps that surfaces information you normally need separate tools to see — build time for the last incremental build, recomposition counts per composable, heap usage, GC events, and frame drop rates — all in a draggable overlay on the device screen.
tags: [android, debugging, compose, gradle, performance]
repo: https://git.lscythe.dev/lscythe/driftlog
status: archived
year: "2023"
featured: false
---

most android performance debugging requires toggling between your device and android studio. you open layout inspector for recomposition counts, flip to the profiler for memory, check the gradle output for build times. the context switching is annoying when you're iterating fast.

driftlog's pitch was simple: put the most useful development metrics on the device screen so you can see them while you're testing.

## what it showed

the overlay had four panels, each toggleable:

**build panel** — the elapsed time for the last incremental gradle build that produced the current running APK. this came from a gradle plugin that wrote a metadata file to the APK's assets on every build. driftlog read the file at app startup and displayed the build time. crude but effective.

**recompose panel** — per-composable recomposition counts since the last screen navigation. this used compose's `RecompositionCounter` API (internal at the time, which was a problem) to count recompositions per composable by name. the panel listed the top 5 composables by recomposition count with a color-coded frequency indicator.

**memory panel** — heap used vs heap available, updated every 2 seconds. a simple line graph showing the last 30 seconds of memory usage. GC events were marked with vertical lines on the graph.

**frame panel** — frame drop count and jank percentage (frames that took over 16ms) over the last 10 seconds. derived from the `Choreographer` frame callback API.

## the draggable HUD

the overlay was a `WindowManager`-injected `ComposeView` drawn over the app. draggable via touch. position was persisted to SharedPreferences so it stayed where you left it across app restarts.

the injection happened in an `Application.ActivityLifecycleCallbacks` implementation that attached the overlay on each activity resume. the overlay's own touches were consumed; touches outside it passed through to the app normally.

## why it's archived

two reasons.

first: compose's `RecompositionCounter` API was internal and got removed in a compose update. this broke the most interesting panel. i could have replaced it with a custom `RecomposeHighlighter` wrapper, but at that point the effort didn't justify the result since android studio's layout inspector now shows recomposition counts in real time.

second: android studio's device mirroring and live metrics got significantly better in 2024. the gap between "information on device" and "information in the IDE" closed enough that driftlog's value proposition got weaker. keeping an app overlay in sync with AGP changes, compose internals, and device API changes is ongoing work that i stopped wanting to do.

the build time panel was the one genuinely novel thing — android studio doesn't show you the build time of the APK currently running on the device. if i revived this project, that's the only panel i'd keep.

## what i learned

don't build tools that depend on internal APIs. the recomposition counting relied on a `@VisibleForTesting` annotation that was basically a "here's how we test this, not for public use" signal, and i ignored it. it broke. this was predictable.

debug tooling also has a higher maintenance cost than it appears because it needs to stay compatible with a fast-moving ecosystem — AGP, compose, android APIs. if the tooling breaks, nobody's app stops working, so it's easy to deprioritize. over time, it bit-rots.
