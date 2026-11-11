#!/usr/bin/env bash
# Creates a separate demo repository with code scanning available so the CodeQL,
# code quality, and Security tab demos have live alerts.
#
# Usage: scripts/create-demo-repo.sh <owner/repo> [--public|--private]
#   --public  (default) code scanning is free on public repos. The demo code is
#             intentionally insecure but contains no real secrets.
#   --private only works for an org with GitHub Code Security / Secret Protection.
set -euo pipefail

target="${1:?usage: create-demo-repo.sh <owner/repo> [--public|--private]}"
visibility="${2:---public}"
root="$(cd "$(dirname "$0")/.." && pwd)"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

mkdir -p "$work/.github/workflows" "$work/.github/prompts"
cp -R "$root/demo-app" "$work/demo-app"
cp "$root/.github/workflows/codeql.yml" "$work/.github/workflows/"
cp "$root/.github/dependabot.yml" "$root/.github/copilot-instructions.md" "$work/.github/"
cp "$root/.github/prompts/"*.md "$work/.github/prompts/"
cat > "$work/README.md" <<'EOF'
# Training demo app (intentionally insecure)

Live demo target for the Nov 12 training: CodeQL, code quality, the Security tab, and Copilot.
**Do not deploy this code.**
EOF

git -C "$work" init -q -b main
git -C "$work" add .
git -C "$work" commit -q -m "Add intentionally insecure training demo app"

gh repo create "$target" "$visibility" --source "$work" --push \
  --description "Intentionally insecure demo app for GitHub security & Copilot training"

# Best-effort enablement; each call may need a license on private repos.
gh api -X PUT "repos/$target/vulnerability-alerts" >/dev/null 2>&1 && echo "✓ Dependabot alerts" || echo "! Enable Dependabot alerts in Settings"
gh api -X PUT "repos/$target/automated-security-fixes" >/dev/null 2>&1 && echo "✓ Dependabot security updates" || echo "! Enable Dependabot security updates in Settings"
gh api -X PATCH "repos/$target" \
  -f 'security_and_analysis[secret_scanning][status]=enabled' \
  -f 'security_and_analysis[secret_scanning_push_protection][status]=enabled' >/dev/null 2>&1 \
  && echo "✓ Secret scanning + push protection" || echo "! Enable secret scanning in Settings"
gh workflow run codeql.yml -R "$target" >/dev/null 2>&1 && echo "✓ CodeQL run started" || echo "! Start CodeQL from the Actions tab"

echo "Done: https://github.com/$target — allow ~5 minutes for CodeQL and Dependabot alerts."
