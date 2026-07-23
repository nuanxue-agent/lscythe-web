---
title: gradle convention plugins
date: 2026-05-15
description: replacing root-level build scripts with convention plugins that actually scale.
tags: [gradle, kotlin, android, build-tooling]
draft: false
---

Most Android projects I've worked on eventually accumulate a mess of root-level `.gradle` files — `test.gradle`, `impl.gradle`, `compose.gradle` — that modules apply with `apply from: rootProject.file('test.gradle')`.

It works, barely, until it doesn't. These scripts don't compose cleanly. They can't declare dependencies on each other. They run in a fragile order determined by when each module applies them. And the first time you need conditional logic — "apply Compose only to UI modules" — you're writing string-based hacks with `project.name.contains()`.

The solution is **convention plugins**: first-class Gradle plugins written in Kotlin DSL, living in a `build-logic/` composite build. They're typed, testable, and composable.

## what convention plugins look like

Convention plugins are Gradle plugins that live in your project. They configure common concerns — Android setup, Compose, testing, Kotlin compiler options — in a way that modules can apply declaratively.

Here's the structure:

```
build-logic/
  conventions/
    build.gradle.kts
    src/main/kotlin/
      AndroidLibraryConventionPlugin.kt
      ComposeConventionPlugin.kt
      TestingConventionPlugin.kt
```

Each plugin is a Kotlin class implementing `Plugin<Project>`:

```kotlin
class AndroidLibraryConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) {
        with(target) {
            pluginManager.apply("com.android.library")
            pluginManager.apply("org.jetbrains.kotlin.android")

            extensions.configure<LibraryExtension> {
                compileSdk = 34
                defaultConfig {
                    minSdk = 26
                }
                compileOptions {
                    sourceCompatibility = JavaVersion.VERSION_17
                    targetCompatibility = JavaVersion.VERSION_17
                }
            }
        }
    }
}
```

Modules apply these plugins the same way they'd apply any Gradle plugin:

```kotlin
plugins {
    id("lscythe.android.library")
    id("lscythe.compose")
}
```

## why this is better

**Composition.** Plugins can apply other plugins. Your `ComposeConventionPlugin` can apply `AndroidLibraryConventionPlugin` internally, so modules get both with a single declaration.

**Type safety.** No more string-based project name matching. Plugins operate on typed Gradle APIs.

**Testing.** Convention plugins are testable. You can write unit tests that apply a plugin to a mock project and verify the configuration.

**IDE support.** IntelliJ understands convention plugins as first-class Gradle plugins, so autocomplete and refactoring work.

## the migration path

You don't have to migrate everything at once. Start by writing convention plugins for the most common concerns — Android library setup, Compose, testing. Apply them to new modules. Gradually migrate old modules as you touch them.

The `build-logic/` composite build is isolated from your main project, so failed experiments don't break the build. Once a convention plugin works, it works everywhere.

## when not to use convention plugins

If your project has fewer than 5 modules, the overhead probably isn't worth it. Stick with root-level scripts until the duplication hurts.

If your build configuration is highly dynamic — different modules need wildly different setups based on runtime conditions — convention plugins will fight you. They work best when your modules follow a small number of predictable patterns.

But for most Android projects, convention plugins are the right answer. They're how Gradle is meant to work, and they scale far better than any alternative.
