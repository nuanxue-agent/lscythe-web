---
title: the problem with feature flags
date: 2026-05-08
description: how feature flag systems accumulate technical debt and rot codebases over time
tags: [android, architecture, feature-flags, technical-debt]
draft: false
---

feature flags are one of those ideas that sound responsible when you implement them and become a nightmare 18 months later when nobody can remember what `enable_new_checkout_flow_v2` actually controls or why it exists.

i'm not arguing against feature flags. i'm arguing that most teams don't treat them as the technical debt they are.

---

## why they exist

the legitimate use cases for feature flags:

1. **gradual rollout** — ship to 5%, validate, ramp to 100%
2. **kill switch** — disable a broken feature remotely without a new build
3. **a/b testing** — show different implementations to different cohorts
4. **in-development work** — merge code behind a flag, enable when ready

all of these are reasonable. the problem is what happens after the flag serves its purpose.

---

## the lifecycle problem

a feature flag starts as a temporary decision boundary. the code behind `if (featureFlags.newCheckout)` is new. the code in the `else` branch is old. you ship both. you ramp the flag. eventually, the new version is stable and rolled out to everyone.

at this point, the flag should be removed. the old code path should be deleted. the `if` statement should disappear. the code should become unconditional.

this almost never happens.

what actually happens: the flag stays. the old code path stays. six months later, someone sees the flag in the codebase and has no idea if it's still in use. they check the remote config dashboard and see it's set to `true` for 100% of users. they still don't know if removing it is safe. they leave it.

now you have dead code gated by a permanent flag. it's not executed, but it's still compiled. it's still tested (maybe). it's still updated when surrounding code changes. it's technical debt that compounds.

---

## the testing problem

every feature flag doubles your test surface. if you have 5 flags, you theoretically have 32 possible states. you don't test all 32 — that's infeasible — so you test the combinations you think matter. which means there are untested states.

i've debugged production crashes that only occurred when `flag_a = true` and `flag_b = false` — a combination we never tested because we assumed both would be enabled together. the flags were independent at the config layer but the code had implicit dependencies. the crash only surfaced when rollout schedules diverged.

the more flags you have, the more this scales poorly. every new flag interacts with every existing flag in ways you haven't thought about.

---

## the cleanup problem

here's the process for removing a flag:

1. verify the flag has been at 100% rollout for long enough that no users are on old versions
2. make sure no other flag or config depends on this one
3. remove the flag checks from the code
4. delete the old code path
5. remove the flag from remote config
6. remove it from the default flags file
7. update tests that referenced it

this is tedious. it's not glamorous. nobody wants to do it. so it doesn't get done.

i've seen codebases with flags from 2021 still in the code in 2026. not because anyone decided they should stay — because nobody had time to do the cleanup work. the longer it sits, the scarier it becomes to touch, because you're less confident you understand what it affects.

---

## what actually works

**set expiration dates on flags.** when you create the flag, document when it will be removed. make it a required field in your feature flag creation process. treat flag removal as part of the feature, not optional cleanup.

**lint for old flags.** write a lint check that fails if a flag older than 6 months is still in the codebase. force the conversation.

**automate the removal.** if you have usage analytics on flags, build tooling that alerts you when a flag has been at 100% for 30 days. someone still has to do the code cleanup, but at least the trigger is automatic.

**use flags sparingly.** not every feature needs a flag. if it's a small change with low risk, just ship it. the overhead of managing a flag might be higher than the risk of the change itself.

---

## the real cost

the thing that finally convinced me feature flags are debt: i spent three days last quarter tracking down a crash that only occurred when a specific set of flags was enabled. the crash was real. but the flag combination was supposed to be impossible based on the rollout plan. someone had changed the plan, not updated the documentation, and the code assumptions were invalid.

feature flags are runtime conditionals on top of your application logic. every conditional is a branch, and every branch is a place where your assumptions might be wrong. too many branches and you stop being able to reason about what your app actually does.

use feature flags. plan their removal. treat them as debt. they're tools, not architecture.
