# 3 · Code quality (7 minutes: 3 slides + 4 live)

**Goal:** the audience understands that GitHub surfaces reliability and maintainability problems, not only vulnerabilities.

## Slides (3 minutes)

| Slide | Say this |
| --- | --- |
| Why code quality matters | "Security asks 'can this be exploited?' Quality asks 'will this break, or slow the team down?' GitHub Code Quality uses CodeQL quality queries and rates repositories on reliability and maintainability." |
| Typical findings | Walk the snippet: "An unused variable is noise. Comparing `code == code` is always true, so the check is meaningless — probably a bug." |

## 🖥️ Live (4 minutes) — in the demo repository

1. Open the repository's **Code quality** view (under the Security / quality area of the repo).
2. Show the **Reliability** and **Maintainability** ratings.
   - 🗣️ "These give leaders a quick health signal and give developers a prioritized list."
3. Open the finding in `demo-app/src/utils/pricing.js`:
   - `code == code` — comparison of identical expressions
   - `unusedRate` — unused local variable
   - `loadPrices` — returned promise not awaited inside `try`, plus an empty `catch`
4. Show the suggested fix and mention you can assign findings to **Copilot coding agent**.
5. Open `demo-app/src/utils/pricing.js` and show `applyDiscount` vs `applyDiscountLegacy`.
   - 🗣️ "Duplicate logic is a maintainability smell: fix a bug in one, and the other keeps it."

**Fallback:** if Code Quality isn't enabled, open **Security → Code scanning** and filter to the non-security (`note`/`warning`) results from the `security-and-quality` suite.

## Planted quality findings

| File | Finding |
| --- | --- |
| `src/utils/pricing.js` | Unused variable, self-comparison, duplicated function, missing `await`, swallowed error |
| `python/report.py` | Mutable default argument, unused variable, bare `except` |

## Check for understanding

> "Why is an empty `catch` block a reliability risk?" → *Errors disappear silently, so failures go unnoticed.*
