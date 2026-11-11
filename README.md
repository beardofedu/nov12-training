# nov12-training

Presenter kit for a **60-minute introductory session** on the GitHub platform, security, and Copilot — a mix of slides and live platform demos.

**📽️ Deck:** <https://beardofedu.github.io/nov12-training/> (built with [Slidev](https://sli.dev), deployed to GitHub Pages)

> The repository is private; the GitHub Pages deck is public.

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
| `.github/workflows/codeql.yml` | CodeQL advanced-setup example (`security-and-quality` suite) |
| `.github/dependabot.yml` | Dependabot version updates example |
| `.github/copilot-instructions.md`, `.github/prompts/` | Copilot customization examples |
| `scripts/create-demo-repo.sh` | Creates a separate repo where code scanning and Dependabot alerts run live |

## Why a separate demo repository?

This repository is private under a personal account, where GitHub Advanced Security features (code scanning, code quality) aren't available. Dependabot alerts **do** work here — see the Security tab. `scripts/create-demo-repo.sh` copies `demo-app/` and the security configuration into a public repo (free code scanning) or an org repo with GitHub Code Security, so alerts are live during the session. The CodeQL workflow here only runs on manual dispatch, or automatically when the repo is public or the `CODE_SCANNING_ENABLED` variable is `true`.

## Work on the deck locally

```bash
cd slides
npm ci
npm run dev      # http://localhost:3030 — press "p" for presenter mode
npm run build    # outputs slides/dist with the /nov12-training/ base path
```

Pushing changes under `slides/` to `main` redeploys the deck.
