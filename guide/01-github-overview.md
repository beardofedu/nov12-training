# 1 · GitHub overview (8 minutes: 3 slides + 5 live)

**Goal:** the audience understands GitHub as one connected platform, centered on the pull request.

## Slides (3 minutes)

| Slide | Say this |
| --- | --- |
| One platform | "GitHub covers plan, build, ship, and secure. The value is that these pieces are connected, not separate tools." |
| Pull request flow | "Everything converges on the pull request: CI, security checks, and reviews all happen here before code merges." |

## 🖥️ Live (5 minutes) — in `beardofedu/nov12-training`

1. **Code tab**
   - Point out the rendered README, the branch selector, and the `.github/` folder.
   - 🗣️ "The `.github` folder holds automation and configuration — workflows, Dependabot, and Copilot instructions all live in the repo alongside the code."
2. **Issues**
   - Open or create an issue; show labels, assignees, and **Development → Create a branch**.
   - 🗣️ "Work starts as an issue. Linking a branch or PR means merging closes the issue automatically."
3. **Pull requests**
   - Open any PR and click through **Conversation**, **Commits**, **Checks**, and **Files changed**.
   - 🗣️ "Reviewers comment line-by-line, and checks must pass before merge."
4. **Actions**
   - Open the **Deploy slides to GitHub Pages** run.
   - 🗣️ "This deck is built and published by GitHub Actions every time I push a change — that's CI/CD in one file: `.github/workflows/deploy-slides.yml`."
5. **Settings → Rules** (mention only)
   - 🗣️ "Rulesets let admins require reviews and passing checks — including security scans — before anything reaches main."

## Check for understanding

> "Where would you look to see whether a change passed its tests?" → *The PR's Checks tab or Actions.*
