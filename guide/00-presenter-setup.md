# Presenter setup (do this the day before)

## 1. Preflight this repository — no setup changes required

Use [beardofedu/nov12-training](https://github.com/beardofedu/nov12-training) for
every platform handoff. It is now **public**; CodeQL default setup, Code Quality,
and secret scanning are enabled. **Push protection is disabled**. Do not change
visibility, billing, or any security settings and do not create another repository.

- [ ] Sign in with an authorized presenter account; security views may require permissions.
- [ ] **Actions** → inspect the latest **default setup** analysis. The verified
  [successful run](https://github.com/beardofedu/nov12-training/actions/runs/42951388442)
  has JavaScript/TypeScript, Python, and Actions analysis jobs.
- [ ] **Security → Code scanning** → open [SQL injection alert #5](https://github.com/beardofedu/nov12-training/security/code-scanning/5)
  in `demo-app/src/server.js`; check its current state, analyzed branch and source path.
- [ ] **Security and quality → Code quality → Standard findings** → check actual
  results. The owner enabled the product; a particular finding or completed scan
  is not guaranteed. Do not substitute code-scanning results for this dashboard.
- [ ] **Security → Dependabot** → select an actual lodash/express/flask alert and
  an existing related update PR if available. A failed updater job is not a successful fix.
- [ ] **Secret scanning** → enabled, with no alerts at the November 10 preflight.
  An empty list is a valid demo, not evidence that every possible secret is detectable.
- [ ] **Settings → Code security** → read only: confirm secret scanning enabled
  and push protection disabled. Do not seed even a test token or attempt a blocked push.
- [ ] Choose an existing PR for the overview. Prepare a disposable branch such as
  `demo/sql-fix-2026-11-12` for Copilot edits; any issue/agent assignment is optional,
  requires policy/entitlement approval, and must stay unmerged during the demo.

**Default versus advanced:** the live scans use GitHub-managed default setup.
The former advanced workflow is preserved in `examples/codeql-advanced.yml.txt`,
outside the workflows directory, so it cannot compete with default setup.
[GitHub documents the conflict](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows);
a historical workflow listed as "active" does not mean it ran successfully.

## 2. Check the deck

- Deck URL: <https://beardofedu.github.io/nov12-training/>
- Presenter mode (with talking points): append `presenter/` to a slide URL, or run locally:

```bash
cd slides && npm ci && npm run dev   # then press "p" or open /presenter
```

## 3. Browser tabs to have open

1. The deck (presenter view on your screen, slides on the shared screen)
2. This repository (`beardofedu/nov12-training`)
3. This repository → Code scanning, Code quality, Dependabot, and Secret scanning
4. VS Code or a Codespace with this repository and Copilot Chat signed in
5. <https://github.com/events/universe/recap> (backup for the Universe section)

## 4. Fallbacks

| If… | Then… |
| --- | --- |
| A fresh CodeQL scan hasn't finished | Show the verified run and alert #5 if still accessible; otherwise trace `demo-app/src/server.js` and label it a source walkthrough, not a new scan |
| Copilot coding agent PR isn't ready | Show the issue assignment and explain the flow; return at Q&A |
| Code Quality is pending, empty, or inaccessible | Show the [official product walkthrough](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/interpret-results) and inspect `pricing.js`; label source discussion separately from product results |
| Secret scanning is empty | Explain detection and response from the existing view; never commit a secret to create an alert |
| Asked to show push blocking | Explain that push protection is disabled here; use the [documentation](https://docs.github.com/en/code-security/concepts/secret-security/about-push-protection), without changing settings |
| Network is slow | Present from a local `npm run dev` build of the deck |

## 5. Safe operation and reset

The vulnerable Node/Python app is a **static scanning fixture**. Do not run
`npm start`, start Flask, expose a port, install its old dependencies for a demo,
or deploy the app. Only the Slidev deck is published. Slides and presenter notes
are public; never include private data or credentials.

After the session, preserve useful changes on the disposable branch and close
temporary PRs unmerged. Restore only edits you made, not unrelated work. Do not
dismiss alerts, disable scanners, merge dependency updates, or toggle settings
to restore the starting state. Recheck alert #5 before a repeat presentation:
if an authorized fix has merged, explain the resolved result rather than reintroducing it.
