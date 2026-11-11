# 2 · CodeQL (10 minutes: 4 slides + 6 live)

**Goal:** the audience can explain sources and sinks, knows how to enable CodeQL, and has seen an alert and an Autofix.

## Slides (4 minutes)

| Slide | Say this |
| --- | --- |
| What is CodeQL? | "CodeQL turns your code into a database and runs queries that describe vulnerabilities. It follows data from where users control it — a **source** — to where it becomes dangerous — a **sink**." |
| Code sample | Point to `req.query.name` (source) and `db.all(sql)` (sink). "Nothing in between cleans the input, so this is SQL injection." |
| Default vs advanced | "This repository uses default setup: GitHub manages the scans. Advanced setup is a separate alternative; the inert reference is `examples/codeql-advanced.yml.txt`. Do not run both." |

## 🖥️ Live (6 minutes) — in `beardofedu/nov12-training`

1. **Actions → CodeQL**: show the [successful default-setup run](https://github.com/beardofedu/nov12-training/actions/runs/42951388442) and its three analysis jobs (JavaScript/TypeScript, Python, Actions). Check the current run's source; do not claim the old advanced workflow ran.
2. **Security → Code scanning**: show the alert list; filter by **Severity: Critical/High**.
3. Open [SQL injection alert #5](https://github.com/beardofedu/nov12-training/security/code-scanning/5) (`js/sql-injection`, `demo-app/src/server.js`; open at the November 10 preflight).
   - Click **Show paths** and walk the flow from `req.query.name` to `db.all`.
   - 🗣️ "This path explains the modeled flow from input to SQL. We still inspect the real code and context; an alert is not proof of exploitability in every deployment."
4. If **Generate fix** (Copilot Autofix) is available under your permissions/policy, inspect its proposed fix.
   - Read the explanation aloud; verify it uses parameter binding rather than assuming it does. If unavailable, compare the code with `db.all('SELECT * FROM users WHERE name = ?', [name], callback)` as a proposed fix.
   - 🗣️ "Autofix proposes; a developer reviews. Nothing merges on its own."
5. *(Optional)* Open your prepared PR and show the CodeQL annotation inline in **Files changed**.

**Expected:** identify the source, SQL construction, sink, and minimal fix in an
actual alert. Do not start the vulnerable server to demonstrate an exploit.
Default setup is configured with the `default` query suite; the advanced
reference's `security-and-quality` suite is not the active scan and is not the
GitHub Code Quality product.

**Reset/fallback:** keep suggested changes on an unmerged branch. If #5 has been
fixed or access is unavailable, show its current state or trace the source with
that limitation stated. Do not reintroduce a flaw, dismiss findings, or change
setup modes. See [the setup conflict reference](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

## Source examples in `demo-app/` (not a guarantee of matching alerts)

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
