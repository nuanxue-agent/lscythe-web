---
title: koin vs hilt after three years
date: 2025-09-18
description: a personal take after running both in production, with concrete tradeoffs and no framework loyalty
tags: [android, dependency-injection, koin, hilt, kotlin]
draft: false
---

i've used both in production. not toy projects - actual apps with 30+ modules, multiple flavors, and teams larger than one person. here's what i actually think.

---

## the short version

hilt is correct for large teams. koin is correct for speed and flexibility. if you work alone or on a small team building something you control, koin is probably better. if you work on an org-wide android platform where different teams share modules, hilt's compile-time guarantees are worth the pain.

---

## where hilt wins

hilt's biggest advantage is the error message you never see. when your dependency graph is broken - a missing binding, a scope mismatch, an incompatible component hierarchy - hilt tells you at compile time. koin tells you at runtime. on a test run if you're lucky. in production if you're not.

in a codebase with 15 feature modules being built by 6 different engineers who may not all understand the DI graph, compile-time verification is not a nice-to-have. it's the thing that keeps `NullPointerException` out of the crash logs.

hilt also integrates deeply with the android framework. `@AndroidEntryPoint`, `@HiltViewModel`, `@HiltWorker` - these are not just convenience annotations. they handle the lifecycle complexity that you'd otherwise write by hand. getting a `ViewModel` injected with the right scope in a fragment that might be detached and reattached is exactly the kind of thing that goes wrong in subtle ways. hilt makes it hard to get wrong.

---

## where koin wins

setup. koin is a kotlin library. you add a dependency, write some modules, call `startKoin`. that's it. no annotation processing, no gradle plugin, no `@HiltAndroidApp` on your Application class that breaks your test runner.

the second place koin wins is multiplatform. if you're building a KMP module and you want shared DI, koin has first-class KMP support. hilt is android-only. this becomes a real constraint when you're moving business logic into a shared module. i've had to maintain two separate DI setups - hilt for android, koin for KMP - which is annoying but sometimes unavoidable. if you're serious about KMP, koin is the default choice for the shared layer.

koin modules are also just kotlin code. you can put them anywhere, compose them however you want, scope them to test builds, replace them in tests with minimal ceremony. there's no generated code to reason about.

---

## the actual tradeoffs

**hilt:**
- compile-time safety (huge in large codebases)
- android lifecycle integration is excellent
- kapt/ksp is required (slower builds, though ksp helps)
- multiplatform: no
- testing: `@UninstallModules` works but is awkward

**koin:**
- runtime errors from bad graphs (acceptable with good test coverage)
- faster builds
- works in KMP
- testing: replace modules easily, works in unit tests without robolectric
- startup time: koin 3.x is fast, not a real concern anymore

---

## what i use now

at nocturn, the main android app uses hilt. it's a fintech app with a lot of modules being touched by a lot of people, and i want the compiler to catch graph errors. the shared KMP layer uses koin.

for personal projects, koin. the fast feedback loop and the lack of annotation processing makes iteration faster, and i'm the only person who can break the graph.

---

## the thing nobody talks about

both of these libraries are doing the same thing: wiring up object graphs. the difference is when the errors surface and how the setup integrates with the rest of your toolchain. neither one will make bad architecture good. i've seen hilt used to inject god objects with 12 dependencies and koin used beautifully with a clean domain layer. the library isn't the design.

choose based on team size, error tolerance, and multiplatform requirements. everything else is bikeshedding.
