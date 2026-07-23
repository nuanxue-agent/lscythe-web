---
title: understanding android process model
date: 2026-01-19
description: how android decides to kill your process and why your app state disappears
tags: [android, processes, lifecycle, architecture]
draft: false
---

most android developers have a vague mental model of the process lifecycle: "android kills apps when memory is low." this is technically true but useless. if you want to build apps that handle process death correctly, you need to understand how the decisions are actually made.

---

## the process priority hierarchy

android assigns every process a priority. when the system needs memory, it kills the lowest-priority processes first. there are five priority levels, and the boundaries between them matter more than most people realize.

**foreground process** - contains an activity the user is interacting with, or a service bound to that activity, or a service with `startForeground()`, or a broadcast receiver running `onReceive()`. these are almost never killed except in extreme memory pressure.

**visible process** - contains an activity that's visible but not in the foreground (e.g., a dialog from another app is on top). still high priority. rarely killed.

**service process** - contains a started service (not foreground). this is where most background work lives. killed fairly aggressively when memory is tight.

**cached process** - the app is in the background with no active components. these are kept in an LRU cache but killed freely. this is where your app lives 90% of the time when the user isn't actively using it.

**empty process** - process is kept around for faster restarts but has no active components. killed first.

---

## the critical transition

the moment your activity's `onStop()` completes and you have no foreground services, you drop from visible to cached. at that point, android can kill you at any time, for any reason, with no warning. you don't get `onDestroy()`. you don't get a chance to save state. the process just ends.

this is the thing that breaks most apps. developers test by pressing the home button, switching apps, and coming back. the app is still alive. they think it worked. in production, the app gets killed after 10 minutes in the background, and when the user comes back, the activity is recreated with no in-memory state. the backstack is restored but the ViewModel data is gone.

the test you should be running: enable "don't keep activities" in developer options. every time you navigate away, android kills the activity. this is closer to real-world behavior than most people realize. cached processes get killed all the time.

---

## what actually survives

when your process is killed:

- **gone:** all in-memory state. ViewModel objects, singleton managers, static fields. everything.
- **restored:** activity backstack, intent extras, fragment arguments.
- **maybe restored:** `onSaveInstanceState()` bundles if you implemented it.

the `savedInstanceState` bundle is your only reliable way to preserve UI state across process death. it's limited to primitive types and parcelables. it's not for business logic state - it's for things like "which tab was selected" or "what text was in the input field."

if you're storing important state in a ViewModel without persisting it to disk or `savedInstanceState`, you will lose it. this is not an edge case. this is normal android behavior.

---

## how workmanager survives

`WorkManager` is an interesting case because it's designed to survive process death. when you enqueue work, the request is persisted to a database. the work runs in a service process, which has higher priority than a cached process. if the process gets killed, `WorkManager` restarts the work in a new process when conditions allow.

this is the correct model for background work: persist the request, decouple the execution from your app's lifecycle. trying to keep a long-running coroutine alive in a cached process is a losing game.

---

## the service vs cached tradeoff

a common mistake: running a background task in a started service to keep the process alive. this works - the process priority stays at "service process" instead of dropping to "cached." but it has a cost.

service processes consume memory that could be used for cached processes. android's LRU cache holds around 16–20 cached processes depending on device RAM. keeping your app at service priority means you're evicting other apps from the cache more aggressively. the system runs worse.

use services for work that needs to run now, not for "keeping the app alive." if you need state to survive, persist it. the correct lifecycle for a background task is: enqueue work, let the process die, let the work execute later in a fresh process.

---

## the implications for architecture

this is why "ViewModel survives configuration changes" is useful but insufficient. configuration changes don't kill the process. background caching does. your architecture needs to handle both.

the pattern that works:

1. UI state (what's on screen) lives in ViewModel and `savedInstanceState`
2. business logic state (what the user has done) lives in a repository backed by persistent storage
3. long-running work is enqueued with WorkManager, not kept in memory

the app launches, pulls state from disk, updates memory, persists changes. when the process dies, the state is already on disk. when the process restarts, it pulls again. the process is ephemeral; the data layer is durable.

android will kill your process. plan for it.
