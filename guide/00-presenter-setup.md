# Presenter setup (do this the day before)

## 1. Create the live demo repository

Code scanning and code quality aren't available on this **private personal** repository (no GitHub Advanced Security). Dependabot alerts already work here, so you can show them from this repo too. Create a separate demo repo where they work:

```bash
# Public demo repo (code scanning is free on public repos)
scripts/create-demo-repo.sh beardofedu/nov12-demo-app --public

# Or a private repo in an org with GitHub Code Security
scripts/create-demo-repo.sh my-org/nov12-demo-app --private
```

Then, in the demo repo:

- [ ] **Actions** → confirm the **CodeQL** run finished (about 5 minutes)
- [ ] **Security → Code scanning** → confirm SQL injection, XSS, path traversal, and command injection alerts
- [ ] **Security → Dependabot** → confirm lodash/express/flask alerts
- [ ] **Settings → Code security** → enable **Code Quality** if available to you
- [ ] Create issue **"Fix SQL injection in /users"** and assign it to **Copilot** so a coding agent PR is ready to show
- [ ] Open a PR that changes `demo-app/src/server.js` so you can show PR annotations and request a **Copilot** review

## 2. Check the deck

- Deck URL: <https://beardofedu.github.io/nov12-training/>
- Presenter mode (with talking points): append `presenter/` to a slide URL, or run locally:

```bash
cd slides && npm ci && npm run dev   # then press "p" or open /presenter
```

## 3. Browser tabs to have open

1. The deck (presenter view on your screen, slides on the shared screen)
2. This repository (`beardofedu/nov12-training`)
3. The demo repository → Security tab
4. VS Code or a Codespace with the demo repository and Copilot Chat signed in
5. <https://github.com/events/universe/recap> (backup for the Universe section)

## 4. Fallbacks

| If… | Then… |
| --- | --- |
| CodeQL hasn't finished | Show the code in `demo-app/src/server.js` and the alert screenshots from the docs |
| Copilot coding agent PR isn't ready | Show the issue assignment and explain the flow; return at Q&A |
| Code Quality isn't enabled | Show quality findings from the `security-and-quality` CodeQL suite |
| Network is slow | Present from a local `npm run dev` build of the deck |
