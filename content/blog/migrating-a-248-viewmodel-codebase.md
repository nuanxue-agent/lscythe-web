---
title: migrating a 248-viewmodel codebase
date: 2026-07-20
description: two years of refactoring a production android app from the inside, without a big bang rewrite.
tags: [android, architecture, kotlin, refactoring]
draft: false
---

This is a story about inheriting a codebase that had grown faster than anyone could maintain it, and the nearly two-year effort to fix it from the inside.

The app is **BCA Life NOW**, the mobile insurance platform for BCA Life, one of Indonesia's major insurance providers. Hundreds of thousands of users rely on it to manage policies, submit claims, find hospitals, and handle everything else that comes with life insurance.

And when I first opened the project in June 2024, the architecture was in trouble.

## the app

BCA Life NOW is not a small app. The first commit was May 2022. By the time I joined, two years of development had produced:

- 60+ Gradle modules
- 248 ViewModels
- 150+ screens

It handles policy management, claim submission with document uploads, user profiles, notifications, and more. Built with Jetpack Compose, Koin for DI, and Ktor for networking.

The features work. Users can do what they need to do. From the outside, it looks fine.

From the inside, it was a different story.

## what i found

The problems showed up immediately:

**248 ViewModels, most of them copy-paste wrappers.** The pattern was `BaseViewModel<Event, State>`, but most implementations just forwarded events to a UseCase and mapped the result to state. The ViewModels added no logic — they were ceremony.

**Inconsistent state management.** Some features used `StateFlow<UiState>`. Others used multiple independent `StateFlow` fields. A few mixed both approaches in the same screen.

**Navigation by string concatenation.** Routes were built by hand-assembling path segments: `"claim/detail/${claimId}"`. No type safety, no compile-time verification, easy to break.

**God modules.** 60+ modules, but no clear layering. Features depended on each other directly. The dependency graph was a web, not a tree.

## what i did

I spent the first few months building trust and gathering evidence. I documented every architectural problem I found, tracked the cost of each one, and built the case that things needed to change.

Then I started building the new standard:

**Proper module structure.** Introduced `feature/`, `domain/`, `data/`, and `core/` layering. Features no longer depend on other features — they depend on domain contracts.

**Gradle convention plugins.** Replaced the root-level `.gradle` files (`test.gradle`, `impl.gradle`, `ui.gradle`) with proper convention plugins in `build-logic/`. Every module type gets a consistent setup.

**The contract pattern.** `Event`, `State`, and `Effect` in `core:ui`. One ViewModel per screen, with a clear interface.

**Type-safe navigation.** Serializable route objects instead of string paths.

**Incremental migration.** No big bang rewrite. Every new feature uses the new standard. Legacy features get refactored one at a time, as we touch them.

Not everyone agreed. Another developer didn't want to use the SideEffect pattern, so they created a second `BaseViewModel` in `core:common` with only two type parameters, effectively deprecating mine. For a while, we had two competing base classes with the same name in the same project.

That kind of friction is part of the story too.

## where it stands

The migration is ongoing. Every module I finish is one less source of friction, but the work continues. The new architecture is provably better — features using it are easier to test, easier to onboard into, and easier to extend.

But legacy code doesn't refactor itself. It requires continuous investment, feature by feature, sprint by sprint.

If you've ever looked at a codebase and thought "someone should fix this," this is what happens when you decide that someone is you.
