'use client'

// Static ASCII illustrations - one per slug pattern, falls back to generic

const illustrations: Record<string, string> = {
  'coroutine': `
    ┌─────────────────────────────┐
    │  coroutinescope             │
    │  ├── dispatcher.io          │
    │  │   └── withcontext()  ──► │ thread pool
    │  ├── dispatcher.main        │
    │  │   └── uistate.emit() ──► │ main thread
    │  └── supervisorjob          │
    │      └── cancel()       ──► │ structured
    └─────────────────────────────┘
         context propagation
  `,
  'viewmodel': `
    ┌──────────────┐    event
    │   ui layer   │ ──────────► viewmodel
    └──────────────┘               │
           ▲                   reducer()
           │                       │
        state ◄─────────────── newstate
        flow       state
                   machine?
                   no. stop.
  `,
  'koin': `
    koin              hilt
    ────────────      ────────────
    runtime DI        compile-time
    no kapt           annotation
    fast setup        processing
    manual scope      auto scope
    reflection        codegen
    
    pick one. stick to it.
  `,
  'compose': `
    @composable fun item(data: Data) {
      //                   ^
      //                   unstable?
      //                   fix the model.
      //                   not the annotation.
      text(data.label)
    }
    
    @stable  ← you shouldn't need this
  `,
  'build': `
    dev loop cost model:
    
    change ──► [compile]
                 │
              8 seconds
                 │
              [deploy]    ← lost focus
                 │          context switch
              [test]        scroll twitter
                 │
              insight     ← or is it?
    
    build time = product velocity
  `,
  'gradle': `
    // groovy (don't)
    dependencies {
      implementation 'com.example:lib:1.0'
    }
    
    // kotlin DSL (do)
    dependencies {
      implementation("com.example:lib:1.0")
    }
    
    // typed. navigable. refactorable.
  `,
  'room': `
    @dao interface thingdao {
      @query("select * from thing")
      fun all(): flow<list<thing>>
    
      @insert
      suspend fun insert(t: thing)
    
      @delete
      suspend fun delete(t: thing)
    }
    // still the right choice.
  `,
  'feature-flag': `
    t=0   flag added      if (flag.enabled) { newpath }
    t+1   qa passes       if (flag.enabled) { newpath }
    t+2   shipped         if (flag.enabled) { newpath }
    t+6   forgotten       if (flag.enabled) { newpath }
    t+12  "don't touch"   if (flag.enabled) { newpath }
    t+18  new hire asks   if (flag.enabled) { newpath }
    t+24  flag.enabled == true forever
  `,
  'process': `
    activity foreground ──► visible ──► background
         │                                  │
         │                           [lru cache]
         │                                  │
         │              low memory ─────────┤
         │                                  ▼
         │                          process killed
         │                                  │
         └───────────── oncreate() ◄────────┘
                        savedinstancestate
  `,
  'navigation': `
    sealed class route {
      @serializable
      data class detail(val id: string) : route()
    
      @serializable
      data object list : route()
    }
    
    navcontroller.navigate(
      route.detail(id = "abc123")  // typed.
    )
  `,
  'spektr': `
    kotlin DSL
         │
         ▼
    token("primary") {
      light = color("#1a1a2e")
      dark  = color("#eee9dc")
    }
         │
         ├──► android  colors.xml
         ├──► ios       Color.swift
         └──► web       variables.css
    
    one source. three outputs.
  `,
  'vektor': `
    state machine:
    
    [idle] ──load──► [loading]
      ▲                  │
      │             success/fail
      │                  │
    [error] ◄──────[loaded]
    
    transition {
      from(idle) on load goto loading
      from(loading) on success goto loaded
    }
  `,
  'nocturnd': `
    task graph:
    
    [fetch-config]
         │
         ├──► [sync-users]
         │         │
         │    [notify]
         │
         └──► [purge-cache]
    
    declarative. observable. cancellable.
  `,
  'sentinel': `
    gradle build ──► sentinel plugin
                          │
                    ┌─────┴──────┐
                    │   checks   │
                    ├────────────┤
                    │ config     │
                    │ cache hit? │
                    │ unused     │
                    │ outputs?   │
                    │ incremental│
                    │ regressed? │
                    └────────────┘
                          │
                       report
  `,
  'krate': `
    @preferences
    interface appsettings {
      var theme: string
      var fontSize: int
      var analyticsEnabled: boolean
    }
    
    // KSP generates:
    // AppSettingsImpl : AppSettings
    // backed by DataStore
    // fully typed. no string keys.
  `,
  'prism': `
    prism screenshot test:
    
    record mode:
      render ──► capture ──► save baseline
    
    verify mode:
      render ──► capture ──► diff
                                │
                         ┌──────┴──────┐
                         │  pixel diff │
                         │ semantic    │
                         │  diff       │
                         └─────────────┘
  `,
  'threadwatch': `
    runtime analysis:
    
    main thread ──► [watchdog]
                        │
                   violation detected
                        │
              ┌─────────┴──────────┐
              │ stack trace logged │
              │ source pinpointed  │
              │ debug build only   │
              └────────────────────┘
  `,
  'pulsar': `
    pulsar websocket:
    
    connect ──► [socket]
                   │
           ┌───────┴────────┐
           │  reconnect     │
           │  queue         │
           │  backpressure  │
           └───────┬────────┘
                   │
           flow<message>
                   │
               collect()
  `,
  'driftlog': `
    ┌─────────────────────────────┐
    │  driftlog HUD         [x]   │
    ├─────────────────────────────┤
    │  build    14.2s  ▼ -1.1s    │
    │  recomps  47     ▲ +12      │
    │  memory   312mb  ──         │
    │  gc       3x     ▲ +1       │
    └─────────────────────────────┘
         floating. debug only.
  `,
  'monobase': `
    monorepo/
    ├── build-logic/
    │   └── conventions/
    │       ├── AndroidLibrary.kt
    │       └── Compose.kt
    ├── gradle/
    │   └── libs.versions.toml
    ├── core/
    ├── feature/
    └── app/
    
    one repo. consistent builds.
  `,
}

const fallback = `
    ┌─────────────────────────────┐
    │                             │
    │   lscythe                   │
    │   android engineer          │
    │   jakarta, id               │
    │                             │
    │   > writing code since 2019 │
    │                             │
    └─────────────────────────────┘
`

interface Props {
  slug: string
}

export default function AsciiIllustration({ slug }: Props) {
  const key = Object.keys(illustrations).find(k => slug.includes(k))
  const art = key ? illustrations[key] : fallback

  return (
    <div style={{
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: 'clamp(0.55rem, 1.1vw, 0.72rem)',
      lineHeight: 1.55,
      color: 'var(--accent)',
      whiteSpace: 'pre',
      padding: '1.5rem 2rem',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      overflowX: 'auto',
      opacity: 0.85,
    }}>
      {art}
    </div>
  )
}
