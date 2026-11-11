# 3 · Code quality (7 minutes: 3 slides + 4 live)

**Goal:** the audience understands that GitHub surfaces reliability and maintainability problems, not only vulnerabilities.

## Slides (3 minutes)

| Slide | Say this |
| --- | --- |
| Why code quality matters | "Security asks 'can this be exploited?' Quality asks 'will this break, or slow the team down?' GitHub Code Quality is a separate product: deterministic CodeQL rules on PRs, default-branch quality debt, and AI analysis of recently changed default-branch files." |
| Typical findings | Walk the snippet: "An unused variable is noise. Comparing `code == code` is always true, so the check is meaningless — probably a bug." |

## 🖥️ Live (4 minutes) — in `beardofedu/nov12-training`

1. Open **Security and quality → Code quality → Standard findings**. The owner has enabled Code Quality here; inspect the actual dashboard and current analysis status.
2. Show existing reliability/maintainability findings and any displayed metrics.
   - 🗣️ "The default-branch view helps us work through existing quality debt; PR findings help prevent new debt."
3. If a finding exists in `demo-app/src/utils/pricing.js`, open it. Otherwise inspect the file as a **source discussion**, not a claimed product result:
   - `code == code` — comparison of identical expressions
   - `unusedRate` — unused local variable
   - `loadPrices` — returned promise not awaited inside `try`, plus an empty `catch`
4. If offered, inspect the suggested fix. Assignment to **Copilot coding agent** depends on entitlement and policy; do not start paid work without approval.
5. Open `demo-app/src/utils/pricing.js` and show `applyDiscount` vs `applyDiscountLegacy`.
   - 🗣️ "Duplicate logic is a maintainability smell: fix a bug in one, and the other keeps it."

**Expected:** distinguish an actual product finding from a source smell and show
how to review a proposed fix. Do not promise every planted example is detected.

**Fallback:** if results are pending, empty, or inaccessible, use the [official
results walkthrough](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/interpret-results)
and the source examples. CodeQL code-scanning alerts, ESLint, tests, and Copilot
code review are **not substitutes presented as Code Quality output**. The active
CodeQL default setup uses the `default` suite, not `security-and-quality`.

**Coverage and gates:** Code Quality can consume Cobertura XML coverage reports
and enforce quality/coverage thresholds through rulesets. No uploaded coverage
report or enforced threshold has been verified here; do not claim one from a test
run alone. Separate product/AI usage costs and permissions can apply.
See [the product reference](https://docs.github.com/en/code-security/concepts/code-quality/code-quality).

**Reset:** leave fixes on an unmerged demo branch; do not dismiss findings or
change rulesets/settings to manufacture results.

## Quality discussion examples (not verified product findings)

| File | Finding |
| --- | --- |
| `src/utils/pricing.js` | Unused variable, self-comparison, duplicated function, missing `await`, swallowed error |
| `python/report.py` | Mutable default argument, unused variable, bare `except` |

## Check for understanding

> "Why is an empty `catch` block a reliability risk?" → *Errors disappear silently, so failures go unnoticed.*
