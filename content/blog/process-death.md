---
title: process death
date: 2026-04-10
description: the android lifecycle event that no one tests for but everyone experiences.
tags: [android, lifecycle, kotlin]
draft: false
---

Process death is the Android lifecycle event that almost no one tests for, but every user experiences.

You're using an app. You switch to another app. Android decides your first app is using too much memory, so it kills the process. When you come back, Android restarts the process and attempts to restore the Activity to the exact state it was in before.

From the user's perspective, the app never closed. From your code's perspective, the entire process was destroyed and recreated.

## what survives

`savedInstanceState` survives. Anything you put in the `Bundle` during `onSaveInstanceState()` comes back when the Activity is recreated.

In Compose, `rememberSaveable` survives. Anything stored with `rememberSaveable` is written to `savedInstanceState` automatically and restored on process recreation.

Everything else is gone. In-memory caches, singletons, ViewModel state (unless you use `SavedStateHandle`), network connections, background coroutines — all destroyed.

## what breaks

The most common failure mode: your app assumes that if the Activity exists, the rest of the app's state also exists. The Activity comes back, but the repository's cache is empty. The ViewModel's state is default-initialized. The user's authentication token is gone.

The second most common failure mode: assuming that `onCreate()` only runs once per logical "session." Users experience onCreate → onStart → onResume → onPause → onStop → onCreate → onStart → onResume as a seamless return to the app. Your code experiences it as two completely independent Activity lifespans, with a hard reset in between.

## how to test for it

Android Studio has a developer option: **Don't keep activities**. Enable it in Developer Options on a physical device or emulator. Now every time you leave an Activity (by pressing Home or switching apps), Android immediately destroys it. When you return, it recreates the Activity from saved state.

This is the closest you can get to process death without actually forcing the OS to kill your app.

Run your app with this setting enabled and navigate through every major flow. If anything crashes, fails silently, or behaves inconsistently, you've found a process death bug.

## how to fix it

**Use `SavedStateHandle` in ViewModels.** Instead of holding state directly in the ViewModel, delegate to `SavedStateHandle`:

```kotlin
class MyViewModel(
    private val handle: SavedStateHandle
) : ViewModel() {
    val username: StateFlow<String> = handle.getStateFlow("username", "")
    
    fun setUsername(value: String) {
        handle["username"] = value
    }
}
```

`SavedStateHandle` writes to `savedInstanceState` automatically. When the process is killed and recreated, the state comes back.

**Separate session state from UI state.** Authentication tokens, user preferences, and persistent data belong in a data layer that survives process death — `DataStore`, `SharedPreferences`, or a local database. UI state belongs in `SavedStateHandle`.

**Test with "Don't keep activities" enabled.** Make it part of your QA process. If it works with this setting on, it'll work when Android kills your app in production.

## why this matters

Process death isn't a rare edge case. It's how Android manages memory on billions of devices with constrained RAM. Users don't know it's happening — they just know your app "lost their place" or "logged them out" when they came back to it.

If you're not testing for process death, you're shipping broken behavior to a significant percentage of your users.
