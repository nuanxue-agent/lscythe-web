---
title: spektr
description: a Compose Multiplatform design token system that generates platform-specific output from a single Kotlin DSL
longDescription: spektr lets you define your entire design system - colors, typography, spacing, elevation - in a single Kotlin DSL and generate Android XML, iOS Swift, and CSS variables as build outputs. no more syncing token files across platforms by hand.
tags: [kotlin, kmp, compose, design-systems, codegen, gradle]
repo: https://git.lscythe.dev/lscythe/spektr
status: active
year: "2026"
featured: true
---

the problem that started spektr was a meeting. our design team updated the primary brand color, and it took three separate PRs - one for android, one for iOS, one for web - to get it deployed. each PR touched a different file format, in a different repository, maintained by a different person. we got the color wrong on iOS because someone copy-pasted the hex without updating the alpha channel.

that's a tooling failure. design tokens should be single-source. the output formats are artifacts, not the source of truth.

## what it does

spektr is a kotlin DSL for defining design tokens. you write your token system once in kotlin, and a gradle plugin generates platform-specific output at build time.

```kotlin
// tokens.kt
val BrandColors = tokenGroup("brand") {
    color("primary") { value = Color(0xFF1A1AFF) }
    color("surface") { value = Color(0xFFFAFAFA) }
    color("on-surface") { value = Color(0xFF1C1B1F) }
}

val Typography = tokenGroup("type") {
    textStyle("body-large") {
        fontFamily = "Inter"
        fontSize = 16.sp
        lineHeight = 24.sp
        fontWeight = FontWeight.Normal
    }
}
```

the gradle plugin runs during the code generation phase and produces:

- `colors.xml` and `type.xml` for android resources
- `Tokens.swift` with a `TokenColors` enum for iOS
- `tokens.css` with CSS custom properties for web

all three are generated from the same source. the design team edits one file; engineers get updated outputs in their next build.

## key technical decisions

**kotlin DSL over YAML or JSON** - other token systems use YAML or design tool exports. i chose kotlin because the token definitions live in the same repo as the android code, tooling support is first-class (autocomplete, navigation, refactoring), and you can write real logic in token definitions if you need derived values.

**gradle plugin for generation** - the output is generated as part of the build, not committed to source control. this avoids merge conflicts on generated files and ensures the generated output is always in sync with the source tokens.

**semantic tokens over raw values** - spektr enforces a two-level token model: primitive tokens (raw values) and semantic tokens (meaningful aliases). `color("primary")` references `BrandColors.primary`, not `0xFF1A1AFF` directly. this makes theming tractable - swapping a theme means remapping semantic tokens to different primitives.

**platform adapters are pluggable** - the core token model is separate from the output generators. adding a new platform target (flutter, tailwind, figma tokens JSON) means writing an adapter, not modifying the core.

## current status

android and CSS outputs are stable. the iOS swift generator is in progress - the challenge is mapping compose's `TextStyle` semantic to swift's `UIFont` + `NSAttributedString` model without losing fidelity. dark mode token variants are coming in the next milestone.
