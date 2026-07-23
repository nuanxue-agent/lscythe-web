---
title: build times are a product problem
date: 2025-04-22
description: slow builds affect team morale and product velocity, not just developer experience
tags: [android, gradle, build-systems, productivity]
draft: false
---

the last time i brought up build times in a product meeting, someone said "that's an engineering concern." i've been thinking about that framing ever since, because i think it's exactly wrong.

build time is not an engineering vanity metric. it is a direct input into how fast your team ships, how often engineers run tests, how willing they are to do small refactors, and how much technical debt accumulates over time. slow builds are a product problem that manifests in the engineering layer.

---

## the math nobody does

let's be conservative. your android build takes 4 minutes for a full clean build and 90 seconds for an incremental build. engineers trigger incremental builds roughly 20 times a day when they're actively coding. that's 30 minutes per engineer per day waiting for builds.

a team of 6 android engineers: 3 hours of lost time per day. over a quarter: roughly 195 engineer-hours spent waiting for the compiler. at any reasonable engineering salary, that's a significant cost that doesn't appear on any roadmap because nobody counted it.

and that's just the direct time cost. it doesn't count:

- the context switch cost of a 4-minute build. you don't wait. you switch to slack. you never fully come back.
- the tests that don't get run because "i'll just push and see if CI catches it"
- the refactors that don't happen because touching that module means a full rebuild
- the features that get monkey-patched instead of properly integrated

---

## the behavioral effect

here's the one that nobody talks about: slow builds change what engineers write.

when a build takes 15 seconds, you iterate. you try things. you refactor freely. when it takes 4 minutes, you think harder before you type, which sounds good but isn't — it means you commit to approaches earlier and change them less. you accrue more debt around the modules that are expensive to rebuild.

i watched this happen on a codebase i inherited. the `:app` module had grown to include things it had no business owning — logic that should have been in feature modules — because engineers kept adding things where they were sure a rebuild would be fast. the architecture decayed into the shape of the build graph.

---

## what actually helps

i've spent more time on gradle optimization than i should have, so here's the honest list of things that actually move the needle:

**modularization** is the biggest lever. if changing a feature module doesn't rebuild your data layer, you've eliminated entire categories of slow builds. the graph topology matters more than any gradle flag.

**configuration cache** is the second biggest. if you're not running with `org.gradle.configuration-cache=true`, you're rebuilding the configuration phase on every build. this is often 20–40 seconds of overhead you can eliminate.

**remote build cache** at the CI layer, shared locally, is transformative for teams. i set this up at nocturn with a self-hosted gradle build cache node and the first clean build after a pull was 3x faster because 80% of the outputs were already cached.

**kotlin incremental compilation** with the new IC backend. the default settings are not optimal. check your `kotlin.incremental` settings and whether you have `kotlin.incremental.useClasspathSnapshot=true`.

---

## the organizational piece

the reason build times don't get fixed is that they're everyone's problem and nobody's responsibility. they show up in every engineer's daily experience but they don't map to any team's OKR.

the fix is making someone responsible. at nocturn, i own the build system. my job includes treating build time regression as a bug — something that gets filed, tracked, and fixed, not just grumbled about in retros.

if your engineering org doesn't have someone who owns the build system, slow builds will keep getting slower. every new module someone adds is a little bit more weight on a scale that nobody's watching.

measure it. track it. treat regressions as bugs. it's a product problem.
