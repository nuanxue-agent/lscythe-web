---
title: type-safe navigation from scratch
date: 2026-07-10
description: building type-safe navigation without a library using sealed classes and kotlinx.serialization
tags: [android, compose, navigation, kotlin]
draft: false
---

i spent a weekend building type-safe navigation without using navigation-compose or any third-party routing library. not because those libraries are bad - they're fine - but because i wanted to understand what the actual problem is and what a minimal solution looks like.

the result is 150 lines of code that handles backstack management, argument passing, and type safety. it's not production-ready but it taught me more about navigation than using a library ever did.

---

## the problem

navigation in compose apps has a few requirements:

1. **destinations** - screens you can navigate to
2. **arguments** - data passed to those screens
3. **backstack** - history of where you've been
4. **type safety** - compile-time guarantees that arguments match what the destination expects

the standard approach is to use string routes with path parameters: `"profile/{userId}"`. you parse the userId from the route and hope it's an Int. this works but it's not type-safe. if someone passes a malformed route, you get a runtime error.

---

## sealed class destinations

the first insight: destinations are a closed set. you know all the screens in your app at compile time. this is exactly what sealed classes model.

```kotlin
@Serializable
sealed interface Destination {
    @Serializable
    data object Home : Destination
    
    @Serializable
    data class Profile(val userId: Int) : Destination
    
    @Serializable
    data class ArticleDetail(
        val articleId: String,
        val source: String? = null
    ) : Destination
}
```

each destination is a data class (or object) that carries its arguments as properties. `Profile` needs a `userId`, so it has a `userId` property. no string parsing. no nullable types for required arguments. the type system enforces correctness.

---

## serialization for deep links

the `@Serializable` annotation comes from kotlinx.serialization. this lets you serialize a destination to a string (for deep links or saved state) and deserialize it back to a typed object.

```kotlin
val destination = Destination.Profile(userId = 42)
val route = Json.encodeToString(destination)  // {"type":"Profile","userId":42}
val parsed = Json.decodeFromString<Destination>(route)  // Profile(userId=42)
```

this solves deep links. if your app receives `myapp://profile/42`, you parse it into a `Destination.Profile(42)` and navigate there. the parsing happens once at the entry point; the rest of your app works with typed destinations.

---

## backstack as a list

the backstack is just `List<Destination>`. navigation operations are list operations.

```kotlin
class Navigator {
    private val _backstack = MutableStateFlow<List<Destination>>(emptyList())
    val backstack: StateFlow<List<Destination>> = _backstack.asStateFlow()
    
    val currentDestination: Destination?
        get() = _backstack.value.lastOrNull()
    
    fun navigate(destination: Destination) {
        _backstack.update { it + destination }
    }
    
    fun pop() {
        _backstack.update { stack ->
            if (stack.size > 1) stack.dropLast(1) else stack
        }
    }
    
    fun popUpTo(destination: Destination, inclusive: Boolean = false) {
        _backstack.update { stack ->
            val index = stack.lastIndexOf(destination)
            if (index != -1) {
                if (inclusive) stack.take(index) else stack.take(index + 1)
            } else stack
        }
    }
}
```

`navigate()` pushes. `pop()` pops. `popUpTo()` clears the stack up to a destination. standard backstack operations, implemented as list transformations.

---

## composition-local for dependency injection

pass the navigator down the tree with `CompositionLocal`:

```kotlin
val LocalNavigator = compositionLocalOf<Navigator> {
    error("Navigator not provided")
}

@Composable
fun App() {
    val navigator = remember { Navigator() }
    
    CompositionLocal provides navigator {
        NavHost(navigator = navigator)
    }
}
```

any composable can now call `val navigator = LocalNavigator.current` and navigate.

---

## NavHost renders the current destination

```kotlin
@Composable
fun NavHost(navigator: Navigator) {
    val currentDestination by navigator.backstack.collectAsState()
    
    Box(modifier = Modifier.fillMaxSize()) {
        currentDestination.lastOrNull()?.let { destination ->
            when (destination) {
                is Destination.Home -> HomeScreen()
                is Destination.Profile -> ProfileScreen(userId = destination.userId)
                is Destination.ArticleDetail -> ArticleDetailScreen(
                    articleId = destination.articleId,
                    source = destination.source
                )
            }
        }
    }
}
```

the `when` expression is exhaustive because `Destination` is sealed. if you add a new destination and forget to handle it here, the compiler fails. that's the type safety.

---

## what's missing

this is a toy implementation. production navigation needs:

- **animations** - shared element transitions, slide-in/out
- **saved state** - preserve scroll position and form input across backstack changes
- **nested navigation** - tabs with independent backstacks
- **single-top / single-task** - launch modes for deduplication
- **lifecycle integration** - properly handle process death and restoration

all of these are solvable, but they're not trivial. navigation-compose handles them. this implementation doesn't.

---

## why i built it anyway

before i wrote this, i thought navigation was complex because routing is inherently hard. after writing it, i think navigation is complex because android lifecycle is hard and animations are hard. the core routing logic - matching destinations to screens - is simple.

understanding the simple version makes it easier to understand what the library is doing and when its abstractions are helping vs. getting in the way. sometimes you need to build the thing to know whether you should use the library.

type-safe navigation doesn't require much code. it requires thinking of destinations as data instead of strings.
