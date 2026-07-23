---
title: coroutine context is not magic
date: 2025-03-12
description: a deep dive into CoroutineContext, dispatchers, and why withContext is not a silver bullet
tags: [kotlin, coroutines, android, concurrency]
draft: false
---

every few weeks i see a PR where someone wraps an entire function body in `withContext(Dispatchers.IO)` and calls it a day. the test passes. the lint check is happy. nothing blows up. and yet something is wrong.

the problem is that `CoroutineContext` is one of those abstractions that works well enough at the surface level that most people never look underneath. and when you don't understand what's actually happening, you end up with code that's technically correct but subtly broken in ways that only show up under load or in edge cases.

---

## what CoroutineContext actually is

`CoroutineContext` is an indexed set of elements. each element has a key. the key is typically the companion object of the element's class. so when you do `coroutineContext[Job]`, you're looking up the `Job` element by its key.

a coroutine's context is composed from multiple sources: the parent coroutine's context, the scope's context, and whatever you pass explicitly. the combination happens at launch time through the `+` operator, which is actually `CombinedContext` internally.

the part most people miss: **context elements are inherited, not shared**. when a child coroutine launches, it gets a copy of the parent's context elements, with its own `Job` instance. this is why structured concurrency works — the parent can track its children because every child holds a reference back through the job hierarchy.

---

## dispatchers are not what you think

`Dispatchers.IO` is backed by a shared thread pool. the pool size defaults to 64 threads, capped at the number of processors. `Dispatchers.Default` uses a pool sized to the number of CPU cores.

here's the thing people miss: `withContext(Dispatchers.IO)` doesn't "move your code to a background thread." it suspends the current coroutine, submits a continuation to the IO dispatcher's thread pool, and resumes when a thread picks it up. the calling coroutine is suspended, not blocked.

this matters because:

1. if you're already on `Dispatchers.IO`, wrapping everything in another `withContext(Dispatchers.IO)` is a no-op — kotlin is smart enough to skip the context switch. but it still adds overhead if the dispatcher *does* change.

2. `withContext` is a coroutine builder. it creates a new coroutine scope. that means any child coroutines you launch inside it are structured under that scope. if you cancel the outer coroutine, the `withContext` block gets cancelled too — but the jobs you launched inside might have different cancellation behavior depending on how they're structured.

3. if you wrap a `suspend fun` in `withContext(Dispatchers.IO)` at the call site, you've now made a decision about threading that belongs in the implementation, not the caller.

---

## the withContext antipattern

the worst version of this looks like:

```kotlin
suspend fun loadUser(): User = withContext(Dispatchers.IO) {
    // ... actually this already suspends on IO internally
    repository.getUser()
}
```

where `repository.getUser()` is a Room `@Query` with `suspend` — which already dispatches to IO under the hood. you've just added an extra context switch for nothing.

the rule i follow: **the function that does the IO decides the dispatcher.** if you're writing a repository, own the dispatcher decision there. if you're writing a use case, trust that your data sources are correct. don't add `withContext` defensively at every layer.

---

## the inheritance gotcha

one more thing that bites people: `CoroutineContext` inheritance means that if you do something like this:

```kotlin
val scope = CoroutineScope(Dispatchers.Main)
scope.launch {
    withContext(Dispatchers.IO) {
        launch { /* this inherits IO, not Main */ }
    }
}
```

the inner `launch` inherits the context of the `withContext` block, not the original scope. this is correct behavior but it's unintuitive. if you're launching fire-and-forget coroutines inside a `withContext` block, make sure you understand what dispatcher they're running on.

coroutines are not threads. context is not configuration. understanding the difference between inheriting, combining, and replacing context elements is the thing that separates coroutine code that works from coroutine code that works until it doesn't.
