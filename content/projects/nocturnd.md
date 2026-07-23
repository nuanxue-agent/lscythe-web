---
title: nocturnd
description: a background task orchestration daemon for Android that replaces ad-hoc WorkManager usage with a declarative task graph
longDescription: nocturnd sits on top of WorkManager and provides a declarative API for expressing task dependencies, retry policies, and constraints. instead of managing individual work requests, you define a task graph and nocturnd handles scheduling, dependency resolution, and observability.
tags: [android, workmanager, background-processing, kotlin, coroutines]
repo: https://git.lscythe.dev/lscythe/nocturnd
status: active
year: "2025"
featured: true
---

at nocturn, the android app has about 20 distinct background tasks: sync, report generation, pending transaction retry, push notification enrichment, cache eviction. each one was added by different engineers at different times, using WorkManager directly, with slightly different retry policies, constraint definitions, and error handling patterns. some tasks had implicit dependencies on others. nobody had documented those dependencies.

the result was a background layer that worked most of the time but was nearly impossible to reason about. when a task failed, understanding why required reading four separate worker classes and piecing together the execution order mentally.

nocturnd is the layer i wanted above WorkManager.

## the problem with raw WorkManager

WorkManager is a solid library. it handles process death, constraints, and guaranteed execution correctly. but its API is imperative and low-level. you enqueue `WorkRequest` objects. you chain them with `WorkContinuation`. you poll their status via `WorkInfo`.

for individual tasks, this is fine. for a system with 20 tasks, some of which depend on others completing successfully, the imperative API becomes unwieldy. dependency declarations are scattered across the codebase. it's easy to add a task without declaring its dependencies. there's no central view of the task graph.

## declarative task graph

nocturnd lets you define the entire task graph in one place:

```kotlin
val syncGraph = taskGraph {
    task("session-refresh") {
        constraints { requiresNetwork() }
        retryPolicy = exponentialBackoff(maxAttempts = 3)
        worker = SessionRefreshWorker::class
    }
    
    task("account-sync") {
        dependsOn("session-refresh")
        constraints { requiresNetwork() }
        worker = AccountSyncWorker::class
    }
    
    task("pending-transactions") {
        dependsOn("session-refresh")
        constraints { requiresNetwork() }
        worker = PendingTransactionWorker::class
    }
    
    task("cache-eviction") {
        dependsOn("account-sync", "pending-transactions")
        worker = CacheEvictionWorker::class
    }
}
```

nocturnd translates this graph into WorkManager `WorkContinuation` chains, handling dependency resolution and topological ordering. you express intent; nocturnd handles the WorkManager API.

## the daemon

the "daemon" part is an in-process coordinator that maintains the task graph state, listens to WorkManager's `WorkInfo` updates, and provides a unified observable interface for task status:

```kotlin
nocturnd.observe("sync-graph").collect { graphState ->
    // graphState contains status of every task in the graph
    // with dependency chain information
}
```

this makes it trivial to build a debug screen showing the current state of all background tasks and their execution history.

## observability

the piece i'm most proud of is the execution log. nocturnd persists task execution events to a local Room database: start time, end time, exit reason, retry count, constraint satisfaction events. this makes post-hoc debugging possible - you can pull the execution log from a device and see exactly what happened and when.

before nocturnd, debugging why a background sync didn't run required instrumenting workers individually. now it's a query against the execution log.

## current status

core task graph execution and observability are stable and in production at nocturn. the next milestone is a compose-based visual task graph inspector for debug builds, similar in spirit to vektor's debugger.
