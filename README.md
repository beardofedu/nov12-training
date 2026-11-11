# nov12-training

Presenter kit for a **60-minute introductory session** on the GitHub platform, security, and Copilot — a mix of slides and live platform demos.

**📽️ Deck:** <https://beardofedu.github.io/nov12-training/> (built with [Slidev](https://sli.dev), deployed to GitHub Pages)

> This repository and the GitHub Pages deck are public. Presenter notes are public too.
> The intentionally vulnerable app is for **source inspection only**: do not start,
> expose, or deploy it. Pages publishes only the deck.

## Run of show

| Time | Section | Format | Guide |
| --- | --- | --- | --- |
| 0:00 | Welcome & agenda | Slides | — |
| 0:03 | GitHub overview | Slides + 🖥️ live | [guide/01-github-overview.md](guide/01-github-overview.md) |
| 0:11 | CodeQL | Slides + 🖥️ live | [guide/02-codeql.md](guide/02-codeql.md) |
| 0:21 | Code quality | Slides + 🖥️ live | [guide/03-code-quality.md](guide/03-code-quality.md) |
| 0:28 | Security tab | Slides + 🖥️ live | [guide/04-security-tab.md](guide/04-security-tab.md) |
| 0:36 | GitHub Copilot | Slides + 🖥️ live | [guide/05-github-copilot.md](guide/05-github-copilot.md) |
| 0:48 | GitHub Universe 2026 highlights | Slides | [guide/06-universe-and-qa.md](guide/06-universe-and-qa.md) |
| 0:55 | Questions & discussion | Open floor | [guide/06-universe-and-qa.md](guide/06-universe-and-qa.md#questions--discussion-5-minutes) |

Every slide has presenter talking points in its speaker notes. Each guide lists click-by-click demo steps, what to say (🗣️), and a check-for-understanding question.

**Before the session:** follow [guide/00-presenter-setup.md](guide/00-presenter-setup.md).

## Repository layout

| Path | Purpose |
| --- | --- |
| `slides/` | Slidev deck (`slides.md`) |
| `guide/` | Section-by-section demo scripts and talking points |
| `demo-app/` | ⚠️ **Intentionally insecure** Node.js and Python code with planted CodeQL, code quality, and Dependabot findings |
| `.github/workflows/deploy-slides.yml` | Builds the deck and deploys it to GitHub Pages |
| `examples/codeql-advanced.yml.txt` | Inert advanced-setup reference; **default setup** runs live CodeQL here |
| `.github/dependabot.yml` | Dependabot version updates example |
| `.github/copilot-instructions.md`, `.github/prompts/` | Copilot customization examples |

## One repository, live platform demos

Use **[beardofedu/nov12-training](https://github.com/beardofedu/nov12-training)**
itself throughout. No second repository or security-setting changes are needed.

| Demo | Current state / entry point |
| --- | --- |
| CodeQL | Default setup configured; [successful setup/analysis run](https://github.com/beardofedu/nov12-training/actions/runs/42951388442), [live SQL injection alert #5](https://github.com/beardofedu/nov12-training/security/code-scanning/5) |
| GitHub Code Quality | Enabled by the owner; **Security and quality → Code quality → Standard findings**. Inspect the actual dashboard; do not promise a specific finding. |
| Dependabot | Live alerts and update PRs; [alerts](https://github.com/beardofedu/nov12-training/security/dependabot), [PRs](https://github.com/beardofedu/nov12-training/pulls) |
| Secret scanning | Enabled; [alerts](https://github.com/beardofedu/nov12-training/security/secret-scanning). No alerts at the November 10 preflight; never plant a credential. |
| Push protection | **Disabled**, separately configured. Explain the control, but do not attempt a blocked-push demo or enable it. |

Settings and findings are a **November 10, 2026 preflight snapshot**, not a
guarantee of future results. Recheck before presenting. Security views may require
an authorized signed-in presenter even though source and slides are public.

CodeQL's default setup owns the live scans. The former advanced workflow is
preserved outside `.github/workflows/` as an inert reference: default setup
[disables existing CodeQL workflows and rejects advanced uploads](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).
An Actions workflow marked "active" is not proof that its analysis ran.
The `security-and-quality` query suite is **not the GitHub Code Quality product**.

Use an unmerged, disposable branch for fix demonstrations. Review diffs and tests;
do not merge a fix just to reset the workshop, dismiss real alerts, or change
visibility/settings. See the [preflight, fallbacks and reset guidance](guide/00-presenter-setup.md).

## Work on the deck locally

```bash
cd slides
npm ci
npm run dev      # http://localhost:3030 — press "p" for presenter mode
npm run build    # outputs slides/dist with the /nov12-training/ base path
```

Pushing changes under `slides/` to `main` redeploys the deck.
