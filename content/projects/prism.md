---
title: prism
description: a lightweight Compose screenshot testing framework with pixel-diff and semantic-diff modes, no Robolectric dependency
longDescription: prism captures compose UI hierarchies, renders them to bitmaps, and compares against golden images stored in version control. it runs on JVM via Compose Desktop, not Robolectric, which makes it fast and eliminates framework mismatch issues. supports both pixel-level diffing and semantic diffing that ignores known flaky elements.
tags: [android, compose, testing, screenshot-tests, kotlin]
repo: https://git.lscythe.dev/lscythe/prism
status: completed
year: "2024"
featured: false
---

screenshot testing on android has historically been painful. the standard approach is paparazzi or shot, both of which use Robolectric to render views. this works but it's slow - robolectric startup time is 5+ seconds per test class - and you're rendering with android framework stubs, not real rendering. the mismatch between test rendering and production rendering leads to false positives.

prism takes a different approach: render with compose desktop, compare bitmaps, no android framework required.

## how it works

prism is a junit5 extension. you annotate a test with `@ScreenshotTest`, provide a composable, and prism:

1. renders the composable using compose desktop's skia backend
2. captures the rendered output as a bitmap
3. compares it against a golden image stored in `src/test/screenshots/`
4. fails the test if the images differ beyond a threshold

```kotlin
@ScreenshotTest
fun loginScreen() = screenshot {
    LoginScreen(
        state = LoginState.Idle,
        onSubmit = {}
    )
}
```

the first time the test runs, there's no golden image, so prism writes one. subsequent runs compare against the golden. when the UI changes intentionally, you update the golden by re-recording.

## pixel diff vs semantic diff

pixel-perfect comparison is fragile. text rendering varies slightly across platforms due to font hinting. antialiasing makes edges non-deterministic. animations captured mid-frame cause flake.

prism supports two diff modes:

**pixel diff** - byte-level bitmap comparison with a configurable threshold. if more than N% of pixels differ by more than M units, the test fails.

**semantic diff** - ignores specified elements. you can mark certain composables as `@Flaky` and prism will mask them out during comparison. useful for timestamps, loading indicators, or anything that changes between runs.

```kotlin
@ScreenshotTest(mode = DiffMode.SEMANTIC)
fun dashboardWithTimestamp() = screenshot {
    Dashboard(
        currentTime = { Flaky { Text(Clock.now()) } }
    )
}
```

the `Flaky` wrapper tells prism to ignore that region. the surrounding UI is still compared.

## why compose desktop

compose desktop uses skia for rendering, which is deterministic and fast. rendering a complex UI takes 10–50ms, not 5+ seconds. you can run hundreds of screenshot tests in CI without blowing the build time.

the tradeoff is that you're not testing with the android compose runtime. in practice, this hasn't been an issue. the rendering differences between desktop skia and android skia are minimal for most UI. if you're relying on platform-specific composables (`AndroidView`, accessibility services), prism won't catch those issues. but for pure compose UI, it works.

## the update workflow

when you change UI intentionally, you need to update the goldens. prism has a gradle task:

```bash
./gradlew updateScreenshots
```

this re-runs all screenshot tests in record mode, overwrites the goldens, and fails if any non-recorded tests fail. you commit the updated goldens alongside the code change. in code review, the diff shows the visual change, which is useful.

## current status

completed. i used it on a personal project for about 6 months and it worked well. i stopped using it when i realized i was changing the UI frequently enough that updating goldens became friction. screenshot tests are most valuable for component libraries where the API is stable and visual regressions are a real concern. for app UI that changes weekly, the maintenance cost outweighs the value.

if you're building a design system or a UI toolkit, prism is useful. if you're building a feature-driven app, snapshot tests are probably more trouble than they're worth.
