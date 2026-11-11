# Copilot instructions for nov12-training

This repository is training material. Code under `demo-app/` is **intentionally insecure** so that CodeQL, code quality, and Dependabot have findings to show.

When asked to fix code in `demo-app/`:

- Use parameterized queries for all SQL (`db.all(sql, [params], cb)` in Node, `?` placeholders in Python).
- Never build shell commands from user input; use `execFile`/`subprocess.run([...])` with argument arrays and validate input.
- Escape or encode user input before writing it to HTML.
- Resolve file paths and verify they stay inside the intended directory.
- Read secrets from environment variables, never from source.
- Keep fixes minimal and explain the vulnerability class in the pull request description.
- Add or update a test with `node --test` (Node) or `pytest` (Python) for each fix.

When editing `slides/slides.md`, keep Slidev syntax (`---` separators, frontmatter per slide) and put presenter talking points in `<!-- -->` notes at the end of each slide.
