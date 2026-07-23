---
title: write your gradle in kotlin
date: 2025-02-07
description: groovy gradle DSL should be considered deprecated for any project started after 2023
tags: [gradle, kotlin, android, build-systems]
draft: false
---

i want to make a simple argument: if you're starting a new android project and writing your build files in groovy, you're making a mistake. and if you have an existing project in groovy and you haven't migrated yet, it should be on the roadmap.

this is not a hot take. the gradle team themselves recommend kotlin DSL. but i still see new projects scaffolded with groovy, and i still see experienced engineers shrug and say "it's just build config, it doesn't matter." it does matter. here's why.

---

## the IDE support gap

the most immediate argument for kotlin DSL is tooling. when you write gradle in kotlin, your IDE understands it. autocomplete works. navigation works. you can cmd-click on a function and see its signature. you can refactor a variable name and have every reference update.

in groovy, none of that is reliable. groovy is dynamically typed, so the IDE is guessing. it guesses wrong constantly. you end up reading gradle docs in a browser tab because your IDE has no idea what `android { }` actually accepts.

i've watched engineers copy-paste gradle snippets from stack overflow because they couldn't figure out what properties were available. that's not a skill issue — it's a tooling failure. kotlin DSL makes your build files first-class code.

---

## type safety in build logic

when you extract build logic into `buildSrc` or a convention plugin (which you should be doing for any non-trivial project), the difference is even more stark.

in groovy, you're writing convention plugins as groovy scripts or classes that get compiled without full type information. you can call properties that don't exist and the error shows up at the gradle execution phase — not when you're writing it, not at configuration time, but when gradle is trying to run.

in kotlin DSL, a typo in a convention plugin is a compile error. the same guarantee that makes application code easier to maintain applies to build code.

```kotlin
// kotlin DSL — the compiler knows what this is
android {
    compileSdk = 35
    defaultConfig {
        minSdk = 26
        targetSdk = 35
    }
}
```

```groovy
// groovy — the IDE is guessing, you're praying
android {
    compileSdkVersion 35
    defaultConfig {
        minSdkVersion 26
        targetSdkVersion 35
    }
}
```

---

## version catalogs make this better

if you're using version catalogs (you should be), kotlin DSL is the natural companion. the generated type-safe accessors — `libs.kotlin.stdlib`, `libs.compose.ui` — are real kotlin properties with autocomplete. in groovy you're back to string lookups.

```kotlin
dependencies {
    implementation(libs.compose.ui)         // typed, autocomplete works
    implementation(libs.compose.material3)  // cmd-click goes to the catalog
}
```

this seems small until you're in a project with 80 dependencies and you want to know where a particular version is defined.

---

## the migration is not that bad

i've migrated three projects from groovy to kotlin DSL. each took a few hours, not days. the main work is renaming things: `apply plugin:` becomes `plugins { }`, string-quoted plugin ids stay the same, `def` becomes `val`, and some property syntax changes.

the most annoying part is usually the `buildSrc` migration because the compilation order matters. but there are solid migration guides and the errors are usually clear.

---

## the compounding argument

build files are code. they get read, modified, and debugged. every convention applies: readability matters, tooling matters, type safety matters. the groovy gradle DSL was reasonable when kotlin was young and the alternative was XML. that's not the current situation.

write your gradle in kotlin. future-you will appreciate the autocomplete.
