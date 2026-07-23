---
title: the case for boring architecture
date: 2026-07-10
description: why i keep reaching for the simplest thing that could possibly work, and why that's not laziness.
tags: [architecture, android, kotlin]
draft: false
---

Every six months or so, a new architectural pattern sweeps through the Android community. We've had MVP, then MVVM, then MVI, and now something that looks suspiciously like a renamed version of one of those.

I've shipped production apps in most of these. And the honest conclusion I've reached: the architecture matters far less than the discipline you apply to whichever one you pick.

## the real cost of complexity

When you choose a complex architecture, you're not just choosing a pattern. You're choosing:

- A learning curve for every new hire
- A set of abstractions that need to be maintained alongside your business logic
- A mental model that future-you has to reconstruct every time you open the file

The simplest thing that could possibly work isn't a cop-out. It's a bet that the complexity you're avoiding now won't cost you more than the complexity you'd introduce by pre-solving it.

## what boring actually looks like

A ViewModel with a single `StateFlow<UiState>`. A repository that talks to a database and a network. A screen that observes that state and renders it.

That's it. You can understand it in five minutes. You can debug it without a diagram.

## the exception

Boring architecture has limits. If you're building something with genuinely complex state — a realtime collaborative editor, a game, a financial trading interface — you need the machinery that matches the problem.

But most apps aren't those things. Most apps are CRUD with some business rules.

Know which one you're building before you reach for the sophisticated solution.
