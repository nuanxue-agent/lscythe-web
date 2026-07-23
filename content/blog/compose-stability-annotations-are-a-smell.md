---
title: compose stability annotations are a smell
date: 2025-11-03
description: if you need @Stable everywhere, your data model is wrong — not your compose code
tags: [android, compose, kotlin, performance]
draft: false
---

i want to talk about `@Stable` and `@Immutable`. not because they're bad — they're not — but because the way i see them used in production codebases tells me something went wrong upstream.

the short version: if you're liberally applying stability annotations to fix recomposition performance, you're treating a symptom. the disease is a data model that mutates in ways compose can't reason about.

---

## what stability actually means

compose's recomposition system works by skipping composables whose inputs haven't changed. to skip safely, compose needs to know whether an input *can* change without the composable being notified. that's stability.

a type is stable if:
- it's immutable (all properties are `val` and the properties' types are also stable), or
- it implements `Stable` and notifies compose when it changes (like `MutableState`)

kotlin data classes with only `val` properties of stable types are stable automatically. `String`, `Int`, `Boolean`, `List` (but not `MutableList`) — stable. compose can infer this without annotations.

`@Immutable` is a contract you're making with the compiler: "i promise this object won't change after creation." `@Stable` is a weaker contract: "if this object changes, compose will be notified." both bypass the compiler's own inference and let you assert stability manually.

---

## the problem with asserting your way out

here's what i see:

```kotlin
@Immutable
data class UserUiState(
    val name: String,
    val items: List<CartItem>
)
```

fine so far. but then:

```kotlin
@Immutable
data class CartItem(
    val product: Product,
    val quantity: Int
)

@Stable  // ← here it comes
class Product(
    var name: String,  // mutable
    var price: Double  // mutable
)
```

`Product` has mutable properties. it's not immutable. so someone slapped `@Stable` on it to make the annotation chain work. now compose thinks `Product` is stable, but it isn't — it can change without compose knowing. you've just lied to the compiler. recomposition bugs that only appear under specific timing conditions are in your future.

---

## the root cause

nine times out of ten, this happens because the domain model and the UI model are the same class. `Product` is the entity from the database, also used directly in the composable. the database entity has mutable state because room or some mapping layer expects it. nobody wanted to write a separate `ProductUiModel`, so they annotated their way around it.

the fix is not annotations. the fix is a separate UI model layer with properly immutable data classes. yes, it's more classes. yes, you have to write mappings. this is the cost of having a UI layer that compose can reason about correctly.

---

## when annotations are correct

`@Immutable` is correct when you have a data class that the compiler can't infer as stable — for example, because it contains a `List` which compose considers unstable due to its interface contract, even though your specific `List` is an unmodifiable `kotlin.collections.List`.

```kotlin
@Immutable
data class ScreenState(
    val items: List<Item>  // List is technically unstable per compose's inference
)
```

here the annotation is accurate — you're asserting something true that the compiler can't verify. that's fine.

`@Stable` is correct for observable holders that integrate with compose's snapshot system. not for mutable pojos you don't want to refactor.

---

## the performance argument

people reach for stability annotations because they see the compose layout inspector showing too many recompositions and they want a quick fix. stability annotations can be that fix. but if you've annotated a type as stable when it isn't, you've swapped incorrect behavior for invisible incorrect behavior. the recompositions go away in the profiler. the bugs show up in QA three weeks later.

the real fix is: immutable UI state. sealed/data classes, no mutable properties, mapped from domain models at the boundary. when your data model is genuinely immutable, compose infers stability correctly and you don't need annotations at all.

annotations should document truth. when they're used to assert a truth that doesn't exist, they're a smell.
