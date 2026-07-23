---
title: the viewmodel is not your state machine
date: 2025-06-04
description: why treating ViewModel as a state machine leads to tangled reducers and unreadable code
tags: [android, architecture, viewmodel, compose]
draft: false
---

somewhere along the way, android developers decided that MVI was the correct architecture pattern, that ViewModel was the right place to implement it, and that a giant sealed class hierarchy was the correct representation of UI state. i've shipped apps this way. i've maintained codebases that went this direction. i'm here to tell you it's usually wrong.

not always wrong. but usually.

---

## what a state machine actually needs

a proper state machine has states, transitions, guards, and side effects. the transitions are explicit. each state knows which transitions are valid from it. you can't move from `Loading` to `Error` without going through `Loaded` first - that would be an invalid transition, and the machine enforces it.

none of that is what most "MVI ViewModels" do. what they actually do is hold a mutable state object, expose it as a `StateFlow`, and have a `reduce()` function that takes an action and returns a new state. that's not a state machine. that's a reducer. there's a difference.

reducers are great for things like form input, where the state is flat and every input can validly arrive at any time. they're bad for multi-step flows where the valid actions depend on what phase you're in.

---

## the tangling problem

here's what happens in practice. you start with:

```kotlin
sealed class UiState {
    object Loading : UiState()
    data class Success(val data: List<Item>) : UiState()
    data class Error(val message: String) : UiState()
}
```

clean. then product adds a refresh state. and a pagination state. and an empty state that's different from the loading state. and a partial success state where some items loaded but others didn't. now you have:

```kotlin
data class UiState(
    val isLoading: Boolean,
    val isRefreshing: Boolean,
    val isPaginating: Boolean,
    val items: List<Item>,
    val error: String?,
    val isEmpty: Boolean,
    val partialError: String?
)
```

and your reducer has branches for every combination of these flags that can legally coexist. which is most of them. which means the reducer is enormous. and you have no way to know, looking at a `UiState` instance, whether `isLoading = true` and `items.isNotEmpty()` is a valid state or a bug.

---

## ViewModel's actual job

ViewModel's job is lifecycle management and scope. it survives configuration changes. it provides a `viewModelScope` for coroutines. it holds a reference to your data layer and exposes the result to the UI.

that's it. that's the whole contract.

the business logic of your screen - the transitions, the rules about what can happen when - that doesn't belong in ViewModel. it belongs in domain-layer objects that ViewModel happens to call. ViewModel is a bridge, not a brain.

---

## what i do instead

for screens with real state machine complexity, i build an explicit state machine - usually a simple class with a `StateFlow<ScreenState>` and functions that represent valid transitions. the state machine knows what's valid; the ViewModel just calls it.

for screens that are mostly displaying data from a repository, i skip the sealed class entirely. a `data class` with nullable fields and a `isLoading` boolean is honest about what it is. it's not trying to be a state machine. it's just state.

the mistake is using the same abstraction for both. a checkout flow with multiple steps and a settings screen that fetches some preferences are not the same kind of problem. don't solve them the same way.

---

## the real cost

the thing that finally convinced me was reading. when i pick up a ViewModel that's 600 lines long and has a 40-branch `reduce()` function, i have no idea what the screen does. i have to reverse-engineer the state machine from the code. if you'd written the state machine explicitly - states, transitions, guards - i'd know immediately.

readability is not a nice-to-have. it's where maintenance cost lives.
