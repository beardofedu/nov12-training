# 4 · The Security tab (8 minutes: 2 slides + 6 live)

**Goal:** the audience knows what each Security tab feature does and where to start.

## Slides (2 minutes)

| Slide | Say this |
| --- | --- |
| What lives in the Security tab | "Code scanning finds bugs in *your* code. Secret scanning finds credentials. Dependabot finds problems in *other people's* code you depend on. Push protection is the one that **prevents** a leak instead of reporting it." |

## 🖥️ Live (6 minutes) — in the demo repository

1. **Security → Overview**: show which features are enabled.
   - 🗣️ "This is your repository's security checklist."
2. **Dependabot alerts**: open the **lodash** alert.
   - Show severity, the advisory, affected/patched versions, and the manifest (`demo-app/package.json`).
   - Show or create the **Dependabot security update** PR.
   - 🗣️ "Dependabot doesn't just tell you — it opens the upgrade PR for you."
3. **Secret scanning**
   - Explain that alerts appear when a token is committed and that partners can be notified to revoke it.
   - *(Optional)* Demonstrate **push protection** using a test token from the GitHub docs — never a real secret.
   - 🗣️ "Push protection stops the secret at `git push`, so it never reaches history."
4. **Code scanning**: return to the alert list and filter by branch and severity.
5. *(If you have org access)* **Organization → Security → Overview**
   - Show coverage (which repos have features on) and risk (open alerts by severity).
   - Mention **Security campaigns** for fixing a backlog across many repos with Autofix.

## Where to start (good closing line)

1. Turn on **Dependabot alerts** and **secret scanning + push protection** everywhere.
2. Enable **CodeQL default setup** on your most important repositories.
3. Use **rulesets** to require code scanning results before merge.

## Check for understanding

> "Which feature stops a secret before it's committed?" → *Push protection.*
