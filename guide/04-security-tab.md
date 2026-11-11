# 4 · The Security tab (8 minutes: 2 slides + 6 live)

**Goal:** the audience knows what each Security tab feature does and where to start.

## Slides (2 minutes)

| Slide | Say this |
| --- | --- |
| What lives in the Security tab | "Code scanning finds risks in *your* code. Secret scanning detects supported secret patterns. Dependabot alerts identify vulnerable dependencies; update PRs are a separate feature. Push protection can block supported secrets in a push, but it is disabled here." |

## 🖥️ Live (6 minutes) — in `beardofedu/nov12-training`

1. **Security → Overview**: show which features are enabled.
   - 🗣️ "This is your repository's security checklist."
2. **Dependabot alerts**: open the **lodash** alert.
   - Show severity, the advisory, affected/patched versions, and the manifest (`demo-app/package.json`).
   - Show an existing related update PR if available. Distinguish a scheduled version update from a security update and inspect its checks; a failed update run is not a delivered fix.
   - 🗣️ "Alerts identify the risk; security updates can propose a patch. We still review compatibility and checks."
3. **Secret scanning**
   - Open [Secret scanning](https://github.com/beardofedu/nov12-training/security/secret-scanning): enabled, with **no alerts at preflight**. Do not create a token to populate the view.
   - Explain that scanning detects supported patterns; partner notification depends on the token/provider. A real leak requires revocation/rotation, not just deleting the line.
   - Read the settings without modifying them: **push protection is separately configured and disabled**. Do not attempt a test-token push or claim it would be blocked here.
   - 🗣️ "Secret scanning detects; push protection, when enabled, can block supported secrets before the push lands. Neither guarantees detection of every credential."
4. **Code scanning**: return to the alert list and filter by branch and severity.
5. *(If you have org access)* **Organization → Security → Overview**
   - Show coverage (which repos have features on) and risk (open alerts by severity).
   - Mention **Security campaigns** for fixing a backlog across many repos with Autofix.

## Where to start (good closing line)

1. Inventory access, policy, entitlement, and current coverage before enabling controls.
2. Here, CodeQL default setup, Code Quality, Dependabot alerts, and secret scanning are already available.
3. Push protection and ruleset enforcement are separate owner decisions; this session changes neither.

**Expected:** explain each control from its real current state, including the empty
secret list and disabled push protection. Review [push protection documentation](https://docs.github.com/en/code-security/concepts/secret-security/about-push-protection)
for a conceptual fallback, not a simulated blocked push.

**Reset:** read-only tour; do not alter security settings, dismiss real alerts,
merge updates, or introduce secrets. If a view is inaccessible, state the access
limitation and use documentation/source instead.

## Check for understanding

> "Which feature can block supported secrets before a push lands, and is it on here?" → *Push protection; it is disabled here. Local commits can already exist.*
