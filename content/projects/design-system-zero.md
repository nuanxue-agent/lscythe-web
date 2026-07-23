---
title: "design system zero"
description: "a minimal, principled design token system built from first principles."
longDescription: "design system zero is an experiment in reduction — taking the bauhaus principle of form following function and applying it to the modern design token workflow."
tags: ["design systems", "tooling", "css"]
url: "https://ds0.lscythe.com"
repo: "https://github.com/lscythe/ds0"
status: "active"
year: "2025"
featured: true
---

## the problem

Every design system starts with good intentions and ends with a `colors.primary.500` token that nobody remembers choosing.

Design System Zero is an attempt to start differently — to derive a complete token set from three decisions: **a base hue**, **a type scale**, and **a spacing unit**.

## the approach

Everything else is computed. The palette is generated via OKLCH with fixed chroma and rotating lightness. The type scale uses a 1.25 ratio. The spacing unit is `8px`.

The result is a system that is *small enough to understand completely* and *principled enough to extend coherently*.

## current status

Active development. The token generator is complete. The component library is in progress.
