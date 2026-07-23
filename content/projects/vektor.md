---
title: vektor
description: a KMP state machine library with coroutine-native transitions, side effects, and a visual debugger
longDescription: vektor is a finite state machine library for Kotlin Multiplatform that treats coroutines as a first-class primitive. transitions are suspending functions, side effects are structured concurrency scopes, and the state graph is inspectable at runtime via a companion debugger app.
tags: [kotlin, kmp, coroutines, state-machines, architecture]
repo: https://git.lscythe.dev/lscythe/vektor
status: active
year: "2026"
featured: true
---

i've written state machines in android apps three different ways: giant sealed class reducers in ViewModel, hand-rolled FSMs with `when` expressions, and third-party libraries that forced me into their mental model. none of them felt right. the reducer approach doesn't actually enforce valid transitions. the hand-rolled approach is fine for simple cases but doesn't compose. the libraries i tried were either JVM-only or treated coroutines as an afterthought.

vektor is what i wanted those libraries to be.

## the model

a vektor state machine is defined as a graph of states and transitions. states are data classes. transitions are typed — each transition specifies the source state type, a trigger (an event class), and a target state. transitions are suspending functions, so they can do async work — network calls, database reads, delays — as part of the transition logic.

```kotlin
val machine = stateMachine<LoginState> {
    initial { LoginState.Idle }
    
    transition<LoginState.Idle, LoginEvent.Submit, LoginState.Loading> {
        LoginState.Loading(credentials = event.credentials)
    }
    
    transition<LoginState.Loading, LoginEvent.Success, LoginState.Authenticated> {
        sideEffect {
            analyticsService.track("login_success")
            sessionStore.persist(event.token)
        }
        LoginState.Authenticated(token = event.token)
    }
    
    transition<LoginState.Loading, LoginEvent.Failure, LoginState.Error> {
        LoginState.Error(message = event.message)
    }
}
```

if you try to dispatch `LoginEvent.Success` when the machine is in `LoginState.Idle`, you get an `InvalidTransitionException`. the graph enforces which transitions are valid from which states. this is the core invariant that reducers don't give you.

## side effects

side effects in vektor are structured. they run in a `CoroutineScope` tied to the current state. when the machine transitions out of a state, in-progress side effects for that state are cancelled. this is the coroutine-native version of "entry/exit actions" in traditional FSM theory.

```kotlin
state<LoginState.Loading> {
    onEnter {
        // runs when entering this state, cancelled on exit
        launch { progressIndicator.show() }
    }
    onExit {
        progressIndicator.hide()
    }
}
```

## the visual debugger

the most useful part of vektor is the debugger. it's a compose desktop app that connects to running instances via a local socket. when debug mode is enabled, the state machine emits transition events over the socket, and the debugger renders the state graph with the current state highlighted and a history of recent transitions.

this was inspired by redux devtools. the ability to see "the machine was in state X, event Y triggered transition to state Z, and the side effect did W" is enormously useful when debugging complex flows. printf debugging state machines is painful; visual state history is not.

## current status

the core library and android target are stable. the debugger is functional but the UI needs work. compose multiplatform iOS target is in progress — the state machine itself works on iOS but the debugger socket bridge needs platform-specific implementation.
