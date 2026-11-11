# 2 · CodeQL (10 minutes: 4 slides + 6 live)

**Goal:** the audience can explain sources and sinks, knows how to enable CodeQL, and has seen an alert and an Autofix.

## Slides (4 minutes)

| Slide | Say this |
| --- | --- |
| What is CodeQL? | "CodeQL turns your code into a database and runs queries that describe vulnerabilities. It follows data from where users control it — a **source** — to where it becomes dangerous — a **sink**." |
| Code sample | Point to `req.query.name` (source) and `db.all(sql)` (sink). "Nothing in between cleans the input, so this is SQL injection." |
| Default vs advanced | "Start with default setup: a few clicks, no YAML. Use advanced setup — like `.github/workflows/codeql.yml` here — when you need custom builds or query suites." |

## 🖥️ Live (6 minutes) — in the demo repository

1. **Actions → CodeQL**: show the run and its three language jobs (JavaScript/TypeScript, Python, Actions).
2. **Security → Code scanning**: show the alert list; filter by **Severity: Critical/High**.
3. Open **Database query built from user-controlled sources** (`demo-app/src/server.js`).
   - Click **Show paths** and walk the flow from `req.query.name` to `db.all`.
   - 🗣️ "This path view is why CodeQL has fewer false positives than pattern matching — it proves the data actually flows."
4. Click **Generate fix** (Copilot Autofix).
   - Read the explanation aloud; point out that it switches to a parameterized query.
   - 🗣️ "Autofix proposes; a developer reviews. Nothing merges on its own."
5. *(Optional)* Open your prepared PR and show the CodeQL annotation inline in **Files changed**.

## Findings planted in `demo-app/`

| File | Finding | CodeQL query |
| --- | --- | --- |
| `src/server.js` `/users` | SQL injection | `js/sql-injection` |
| `src/server.js` `/greet` | Reflected XSS | `js/reflected-xss` |
| `src/server.js` `/reports` | Path traversal | `js/path-injection` |
| `src/server.js` `/ping` | Command injection | `js/command-line-injection` |
| `src/db.js` | Hard-coded credential | `js/hardcoded-credentials` |
| `python/report.py` `/orders` | SQL injection | `py/sql-injection` |
| `python/report.py` `/export` | Command injection | `py/command-line-injection` |

Exact alert titles and which findings appear can vary with CodeQL versions.

## Check for understanding

> "In `/greet`, what's the source and what's the sink?" → *`req.query.name` is the source; `res.send` with HTML is the sink.*
