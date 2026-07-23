---
title: krate
description: a type-safe SharedPreferences/DataStore wrapper built on KSP that generates fully typed accessors from an annotated interface
longDescription: krate eliminates string keys and unsafe casts from SharedPreferences. you define your preferences schema as a kotlin interface, annotate it with @Preferences, and KSP generates a type-safe implementation. reads and writes are suspend functions backed by DataStore.
tags: [android, ksp, codegen, datastore, kotlin]
repo: https://git.lscythe.dev/lscythe/krate
status: completed
year: "2024"
featured: false
---

every android project has a preferences class that looks like this:

```kotlin
object Prefs {
    private const val KEY_USER_ID = "user_id"
    private const val KEY_THEME = "theme"
    
    fun getUserId(context: Context): String? =
        context.getSharedPreferences("app_prefs", MODE_PRIVATE)
            .getString(KEY_USER_ID, null)
    
    fun setUserId(context: Context, id: String) {
        context.getSharedPreferences("app_prefs", MODE_PRIVATE)
            .edit()
            .putString(KEY_USER_ID, id)
            .apply()
    }
}
```

this is fine for small apps. for larger apps with 30+ preference keys, it's a mess. the string keys are stringly-typed, the getters return nullables even for required values, and forgetting to call `apply()` is a silent failure.

krate is the typed wrapper i wanted.

## the interface

you define your preferences as a kotlin interface:

```kotlin
@Preferences("app_prefs")
interface AppPreferences {
    @StringPref(default = "")
    var userId: String
    
    @EnumPref(default = Theme.SYSTEM)
    var theme: Theme
    
    @BooleanPref(default = false)
    var hasCompletedOnboarding: Boolean
    
    @IntPref
    val loginCount: Int?  // nullable, no default
}
```

KSP generates an implementation that stores values in DataStore. reads are suspend functions that return the typed value. writes are suspend setters.

```kotlin
val prefs = Krate.create<AppPreferences>(context)

// read
val userId = prefs.userId  // suspend getter, returns String

// write
prefs.userId = "abc123"  // suspend setter
```

## why KSP instead of reflection

i could have used reflection to read the interface at runtime. i chose KSP because:

1. **performance** — the implementation is generated at compile time, no reflection overhead
2. **correctness** — if your interface declares an unsupported type, KSP fails at compile time
3. **multiplatform** — KSP works in KMP, reflection doesn't

## supported types

krate supports primitives, strings, enums, and json-serializable data classes via kotlinx.serialization. the json support lets you store complex objects without writing custom serializers:

```kotlin
@JsonPref
var userProfile: UserProfile?
```

internally, this serializes `UserProfile` to json and stores it as a string. not the most efficient representation but pragmatic for 90% of cases.

## migration from SharedPreferences

krate includes a migration helper that reads from SharedPreferences and writes to DataStore on first access. this makes migration incremental — you can migrate one preference at a time without breaking existing code.

## current status

completed. i used it in two personal projects and then stopped maintaining it when i realized DataStore's typed API (Preferences DataStore with extension functions) is almost as good and doesn't require codegen. krate is a better API but not enough better to justify the compile-time overhead of KSP.

if you're starting from scratch with no legacy SharedPreferences, just use DataStore's typed API. if you have a large existing SharedPreferences codebase and want a safer migration path, krate might be useful.
