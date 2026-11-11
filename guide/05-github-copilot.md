# 5 · GitHub Copilot (12 minutes: 4 slides + 8 live)

**Goal:** the audience sees Copilot explain, fix, test, take an issue, and review a PR.

## Slides (4 minutes)

| Slide | Say this |
| --- | --- |
| Copilot across the workflow | "In the editor, Copilot completes code and chats. On GitHub, it can take an assigned issue and open a PR, or review your PR. You stay in control: Copilot proposes, people approve." |
| Make it yours | "The single best tip: add `.github/copilot-instructions.md`. Copilot reads it on every request in this repo." Show this repo's file. |

## 🖥️ Live (8 minutes)

Open **beardofedu/nov12-training** in VS Code or a Codespace with Copilot Chat.
Use a disposable branch, not `main`. Inspect/edit source only; do not start the
intentionally insecure server or install its old runtime dependencies.

1. **Explain** — select the `/users` route in `demo-app/src/server.js` and ask:
   > `/explain what could go wrong with this route?`
   - 🗣️ "It spots the SQL injection we saw in CodeQL — same problem, different entry point."
2. **Fix** — ask:
   > `In demo-app/src/server.js, propose a minimal fix for CodeQL alert #5 on /users using sqlite3 parameter binding. Preserve response/error behavior. Explain the diff before editing. Do not start the server, install dependencies, merge, or change security settings.`
   - Review the diff; point out it follows `.github/copilot-instructions.md`.
3. **Reusable prompt** — run the `explain-alert` prompt from `.github/prompts/explain-alert.prompt.md` on the `/ping` route.
4. **Test** — select `applyDiscount` in `src/utils/pricing.js` and ask:
   > `Write node:test unit tests importing only demo-app/src/utils/pricing.js, not server.js or db.js. Cover SAVE10, SAVE20, SAVE30 and an unknown code. Run node --test on the new test file and report the actual result. Do not install dependencies or start services.`
5. **Coding agent** — on github.com, open the prepared issue **"Fix SQL injection in /users"** assigned to Copilot.
   - Show the PR it opened, its session log, and that it requests your review.
   - 🗣️ "This is asynchronous work: assign it like a teammate, review it like a teammate."
6. **Code review** — on a PR, choose **Reviewers → Copilot** and show its comments.

**Expected:** a reviewed parameterized-query diff, focused passing tests, and an
honest report of what the agent actually did. Test generation is not itself proof
that the SQL fix works. Check parameter binding and response/error handling against
the sqlite3 API; do not claim the live alert is resolved until an authorized merge
and subsequent default-setup analysis confirms it.

**Fallback/reset:** if Copilot or a prepared PR is unavailable, read the prompt and
walk the proposed diff manually, labeled as a presenter walkthrough. Keep edits on
the demo branch; close temporary PRs unmerged. Do not reintroduce vulnerabilities
or dismiss alerts to reset. Client features depend on license and policy.

## Tips to share

- Be specific: name the file, the goal, and the constraint.
- Iterate: "make it shorter," "use the existing helper."
- Always review generated code — especially security fixes — and run the tests.

## Check for understanding

> "Where do you put team-wide guidance for Copilot?" → *`.github/copilot-instructions.md`.*
