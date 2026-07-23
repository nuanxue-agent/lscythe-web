---
title: kotlin multiplatform in 2026
date: 2026-06-28
description: where kmp actually delivers on the promise, and where the seams still show.
tags: [kotlin, kmp, mobile, architecture]
draft: false
---

I've been building **Lyra**, a Kotlin Multiplatform app targeting Android and Desktop, for the past few months. Not a toy demo — a real app with a real architecture, the kind you'd actually ship. The goal is to understand where KMP's shared logic holds up in practice and where the platform boundaries force you to write `expect/actual`.

Here's what I've learned.

## what actually shares well

Pure Kotlin business logic shares almost perfectly. Data models, use cases, repositories, network clients, database access — if it doesn't touch platform APIs, it compiles and runs identically on both targets.

The value shows up immediately. Write a validation rule once, test it once, and both platforms get it. Change a data transformation, and the behavior stays consistent everywhere. This is the promise of KMP, and it delivers here.

Compose Multiplatform is the other big win. The same `@Composable` functions render correctly on Android and Desktop. UI logic, state management, navigation — all shared. The only platform-specific code is the entry point (`Activity` on Android, `main()` on Desktop) and the occasional styling tweak.

## where the seams show

Platform APIs are where KMP's abstractions break down. Anything touching the filesystem, sensors, notifications, or platform UI conventions needs careful `expect/actual` design.

File access is a good example. Android has `Context.filesDir`. Desktop has `System.getProperty("user.home")`. You can wrap these in a common interface, but the underlying semantics differ — Android's app-private storage vs. Desktop's user-writable directories. The abstraction leaks.

Notifications are worse. Android's notification API is rich and deeply integrated with the system. Desktop notifications (via `java.awt.SystemTray` on JVM) are primitive by comparison. You can define a common interface for "show a notification," but the feature set you can safely expose is the intersection of both platforms — which is small.

## the tooling situation

KMP tooling has improved significantly. IntelliJ handles multiplatform projects much better than it did a year ago. Compilation times are no longer the blocker they once were. Gradle sync is slower than pure Android, but not prohibitively so.

The pain points:

**Debugging.** When a shared function behaves differently on Android vs. Desktop, diagnosing why requires switching between entirely different debugging toolchains. Android Studio's debugger vs. IntelliJ's JVM debugger.

**Library compatibility.** Many Kotlin libraries claim multiplatform support but only test on JVM and Android. iOS support is often an afterthought, and Desktop support is rare. You end up auditing dependencies more carefully than you would in a single-platform project.

## would i use it in production?

For the right project, yes. If your app's core value is in its business logic — data processing, complex validation, API orchestration — and the UI is mostly a thin presentation layer, KMP makes sense.

If your app's value is in deep platform integration — native widgets, OS-level automation, platform-specific APIs — KMP becomes a liability. You'll spend more time fighting `expect/actual` boundaries than you save on shared code.

The decision is simple: look at where your complexity lives. If it's in the logic, share the logic. If it's in the platform, don't.
