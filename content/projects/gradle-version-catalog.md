---
title: gradle-version-catalog
description: shared version catalogs for consistent kotlin and android dependency management across projects.
longDescription: A set of opinionated Gradle version catalogs that pin dependency versions across multiple projects, eliminating the drift that accumulates when each project manages its own versions independently.
tags: [gradle, kotlin, android, build-tooling]
repo: https://git.lscythe.dev/lscythe/gradle-version-catalog
status: active
year: "2025"
featured: false
---

## why this exists

After working across several Kotlin and Android projects simultaneously, I got tired of each one drifting to different versions of the same dependencies. A security fix in OkHttp would get applied to one project and not the others. Compose BOM bumps would happen inconsistently. Debugging a transitive dependency conflict across projects was miserable.

The solution: a single source of truth for dependency versions, shared across all projects via Gradle's version catalog feature.

## what's included

Kotlin and KGP, AndroidX core libraries, Compose and Compose Multiplatform, Ktor, Coroutines, kotlinx.serialization, testing (JUnit5, Kotest, Turbine, MockK), and common Gradle plugin versions.

## usage

Reference the catalog in `settings.gradle.kts`:

```kotlin
dependencyResolutionManagement {
    versionCatalogs {
        create("libs") {
            from("dev.lscythe:version-catalog:1.0.0")
        }
    }
}
```

Then reference dependencies by alias:

```kotlin
dependencies {
    implementation(libs.ktor.client.android)
    implementation(libs.compose.bom)
    testImplementation(libs.turbine)
}
```

Updates to the catalog propagate to all projects that consume it on the next sync.
