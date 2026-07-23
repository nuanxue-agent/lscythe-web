---
title: room is still the right choice
date: 2026-02-14
description: defending Room in 2026 against SQLDelight and Realm — it's still the pragmatic default
tags: [android, room, database, sqlite]
draft: false
---

every few months someone asks me why we're still using room at nocturn when sqldelight exists, or when realm is "so much faster." the short answer is: room is boring, well-integrated, and solves the actual problems i have. the alternatives solve problems i don't.

---

## what room gets right

room is an annotation processor that generates type-safe sqlite wrappers. it doesn't try to abstract away sql — it embraces it. you write queries in sql, room verifies them at compile time, and generates kotlin code that executes them. the result is predictable, debuggable, and close to the metal.

the integration with android is seamless. `suspend` functions dispatch to IO automatically. `Flow` support for reactive queries is first-class. migrations are explicit and verifiable. the generated code is readable kotlin that you can step through in a debugger. when something goes wrong, the stack trace makes sense.

room also integrates with paging 3, which is important when you have lists that might pull from local cache or network. the `PagingSource` implementation that room generates handles all the boundary conditions correctly. i've written custom paging sources — you don't want to.

---

## the sqldelight argument

sqldelight's pitch is compile-time verification of sql, better than room. except room already has compile-time verification — it fails at compile time if your query references a column that doesn't exist or returns a type that doesn't match your data class.

sqldelight does this with a full sql parser, which means it catches more edge cases and gives better error messages for complex queries. if you're writing a lot of complex sql — multi-table joins, CTEs, window functions — sqldelight's tooling is legitimately better.

but most apps aren't doing that. most room queries are simple selects, inserts, and updates with a where clause. the extra rigor of sqldelight is solving a problem that doesn't show up in practice.

the other sqldelight argument is multiplatform. sqldelight is KMP-native, room is android-only. if your database logic needs to run on iOS, sqldelight wins by default. but for a lot of apps, the database *is* the local cache layer for android-specific UI state. moving it to KMP doesn't make sense. the business logic is shared; the persistence layer is platform-specific.

---

## the realm argument

realm's pitch is performance and object-based queries instead of sql. on benchmarks, realm is faster — especially for complex object graphs with relationships. in practice, the difference rarely matters.

android apps are i/o bound on network and rendering, not on database queries. the bottleneck is almost never "room took 8ms instead of 3ms to fetch this list." it's "the network call took 400ms" or "this recyclerview is doing work on the main thread."

realm's object model is also a conceptual commitment. your data classes become realm objects, which means they extend `RealmObject` and carry realm-specific lifecycle semantics. you can't just pass them around freely — they're tied to the realm instance. this is fine if you're bought into realm's model, but it's a leakier abstraction than room's plain data classes.

room's philosophy is: your entities are data classes, your queries are sql, and the generated code is just plumbing. realm's philosophy is: your entities are realm-managed objects and you query them with realm's query api. the latter is more magical when it works and more opaque when it doesn't.

---

## what i actually care about

i care about debuggability. when a query is broken, i want to copy it into a sqlite cli and run it manually. room makes this trivial because the query is literal sql in the dao. realm and sqldelight are harder to introspect because the query is constructed at runtime or generated from an IR.

i care about migration correctness. room's migration testing api lets me write tests that verify migration paths. i've caught schema bugs this way that would have been data loss in production. realm's automatic migrations are nice until they guess wrong.

i care about not fighting the platform. room is part of jetpack. it gets first-class support in android studio. the libraries compose well with the rest of the android ecosystem. when google ships a new concurrency primitive or a new paging api, room supports it quickly. that's not a technical argument, but it's a practical one.

---

## when room is wrong

if you're building a KMP app and the database needs to be shared, use sqldelight. if you have genuinely complex relational queries and want better compile-time verification, use sqldelight. if your data model is heavily object-oriented with deep graphs and you value query ergonomics over sql transparency, consider realm.

for most android apps, room is still the right default. boring is good. sql is good. knowing exactly what your database is doing is good.
