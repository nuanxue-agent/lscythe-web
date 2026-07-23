---
title: threadwatch
description: a runtime thread-safety analyzer for Android that detects main-thread violations and cross-thread state mutations at runtime in debug builds
longDescription: threadwatch instruments your code at runtime in debug builds to detect two classes of threading bugs - work happening on the main thread that shouldn't be, and mutable state being accessed from multiple threads concurrently. violations surface as logcat warnings with full stack traces.
tags: [android, threading, debugging, kotlin, runtime-analysis]
repo: https://git.lscythe.dev/lscythe/threadwatch
status: archived
year: "2024"
featured: false
---

android's strict mode catches some threading violations. `StrictMode.setThreadPolicy` will yell at you for disk reads on the main thread. but it doesn't catch everything - it won't catch you mutating a `HashMap` from a background thread while reading it from the main thread, and it won't catch you performing expensive operations in the main thread that aren't technically disk or network I/O.

threadwatch was an attempt to catch a broader class of threading bugs at runtime.

## what it detects

**main thread violations** - any function annotated with `@BackgroundOnly` that gets called on the main thread triggers a violation. you annotate the functions that should never run on the main thread:

```kotlin
@BackgroundOnly
fun processLargeDataset(data: List<Item>): Result {
    // expensive work
}
```

if this gets called on the main thread in a debug build, threadwatch logs a violation with a full stack trace pointing to the call site.

**cross-thread state mutation** - any class annotated with `@ThreadConfined` that gets accessed from a thread other than the one it was created on:

```kotlin
@ThreadConfined
class UserSessionCache {
    private val cache = HashMap<String, UserSession>()
    // ...
}
```

if a background thread touches an instance of `UserSessionCache`, threadwatch logs it. useful for catching races before they become intermittent crashes.

## how it works

threadwatch uses a bytecode transformation plugin (a gradle transform, pre-AGP; now an AGP artifact transform) to instrument classes at compile time. for `@BackgroundOnly` functions, it inserts a thread check at the function entry point. for `@ThreadConfined` classes, it inserts thread identity checks on field reads and writes.

the instrumentation only runs in debug builds. the gradle plugin strips annotations and skips instrumentation in release builds, so there's zero production overhead.

## the problem i ran into

the bytecode transformation approach worked but was fragile. AGP's transform API changed significantly between 7.x and 8.x, and keeping up with the changes was more work than the library justified. the transform also didn't handle kotlin inline functions correctly - inline functions are expanded at the call site, and the thread check injection didn't work reliably after inlining.

i also realized that most of the threading bugs threadwatch caught were the same class of bug: someone passing a main-thread-constructed object to a coroutine running on `Dispatchers.IO`. the real fix was making those objects immutable data classes, not adding runtime checks.

## why it's archived

after using it for about 8 months, i concluded that it was finding real bugs but the maintenance cost was too high relative to the alternatives. a combination of immutable data classes, strict `@MainThread`/`@WorkerThread` annotations from `androidx.annotation` (which are checked by lint), and careful coroutine dispatcher choices eliminates most of the bugs threadwatch found.

it's archived, not deleted. the technique is sound. if someone wants to revive it with a clean AGP 8.x implementation and proper inline function handling, the core logic is still valid. but i'm not the one to do it - i've moved on to approaches that prevent the bugs rather than detect them.

## what i learned

instrumentation-based runtime analysis is powerful but expensive to maintain. the tool is only as good as your ability to keep up with the platform's build tooling changes. if you build something that hooks into gradle transforms or bytecode, you're signing up for a maintenance relationship with AGP's release schedule. that's a real cost.
