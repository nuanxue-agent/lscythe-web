---
title: pulsar
description: a real-time Kotlin Multiplatform WebSocket client with automatic reconnection, message queuing, and backpressure via Flow
longDescription: pulsar wraps platform WebSocket implementations behind a unified KMP interface that exposes a Flow-based API. it handles reconnection with exponential backoff, buffers outbound messages during disconnections, and applies backpressure to inbound message streams using kotlin's channel API.
tags: [kotlin, kmp, websockets, networking, coroutines, flow]
repo: https://git.lscythe.dev/lscythe/pulsar
status: completed
year: "2023"
featured: false
---

websockets on android are straightforward. OkHttp has a solid websocket implementation, you implement `WebSocketListener`, and you're done. the problem is that websocket *management* - reconnection, state handling, message queuing across disconnections - is not straightforward. every project i've seen rolls its own reconnection logic, and it's usually wrong in subtle ways.

pulsar is the websocket manager i kept wanting to extract and reuse.

## the problem with raw websockets

raw websocket APIs give you connection and message callbacks. they don't give you:

- automatic reconnection with backoff when the connection drops
- message queuing so that messages sent during a disconnection are delivered when the connection restores
- backpressure for high-volume message streams
- a clean lifecycle that ties to your coroutine scope

you build these yourself or you get race conditions. i've debugged enough "message sent before connection was ready" and "reconnection storm when the server restarts" bugs to know that this logic is harder than it looks.

## the API

pulsar exposes a `PulsarClient` with a coroutine-native interface:

```kotlin
val client = PulsarClient.create(
    url = "wss://api.example.com/ws",
    reconnect = ReconnectPolicy.ExponentialBackoff(
        initialDelay = 1.seconds,
        maxDelay = 30.seconds,
        jitter = 0.2
    )
)

// connect and start receiving
client.connect(scope)

// send - queued if not connected
client.send(Message.Text("hello"))

// receive - Flow with backpressure
client.messages.collect { message ->
    handleMessage(message)
}

// connection state
client.state.collect { state ->
    when (state) {
        is ConnectionState.Connected -> {}
        is ConnectionState.Reconnecting -> {}
        is ConnectionState.Disconnected -> {}
    }
}
```

`send()` never fails silently. if the connection is down, the message goes into a buffer. when the connection restores, buffered messages are sent in order. you can configure the buffer size and the behavior when the buffer is full (block, drop oldest, drop newest).

## multiplatform

pulsar targets android, JVM, and iOS. each platform has its own websocket implementation under the hood - OkHttp on android/JVM, NSURLSession on iOS - but the API surface is identical. the reconnection logic, state machine, and message buffering are in the common module.

the state machine is implemented with a `Channel`-based event loop. connection events (opened, closed, error) are sent to a channel. a coroutine processes events and drives the reconnection logic. this keeps the state mutations single-threaded without blocking.

## what i'd do differently

the message buffer uses `ArrayDeque` protected by a `Mutex`. this works but it's heavier than it needs to be. if i were rebuilding this today i'd use a lock-free ring buffer or kotlin's built-in `Channel` with a buffer capacity. the current implementation is correct but over-engineered for the problem.

i'd also decouple the serialization. pulsar currently handles `String` and `ByteArray` messages and leaves serialization to the caller. a few users asked for built-in json support. i should have made serialization a pluggable concern from the start rather than something people work around.

## current status

completed. stable. the library is used in two personal projects. i stopped active development when i moved the apps using it to a shared KMP networking layer that wraps pulsar. i'd update it if i had a real use case that required changes.
