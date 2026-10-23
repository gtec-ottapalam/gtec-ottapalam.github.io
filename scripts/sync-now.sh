#!/usr/bin/env bash
# Perform an immediate git commit and push right now
cd "$(dirname "$0")/.." || exit 1

echo "🔍 Checking for uncommitted changes..."
STATUS=$(git status --porcelain)

if [ -z "$STATUS" ]; then
  echo "✅ Working tree is already clean. Checking if local commits need to be pushed..."
  git push origin main
  exit 0
fi

echo "📦 Found modified/untracked files:"
git status --short

echo ""
echo "🚀 Staging all files..."
git add -A

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
CUSTOM_MSG="${1:-Manual sync from Antigravity: update project files [$TIMESTAMP]}"

echo "💾 Committing changes: \"$CUSTOM_MSG\""
git commit -m "$CUSTOM_MSG"

echo "⬆️  Pushing to GitHub (origin/main)..."
if git push origin main; then
  echo ""
  echo "✅ SUCCESS: All files successfully uploaded to GitHub!"
else
  echo ""
  echo "⚠️ Push rejected. Attempting rebase pull..."
  git pull --rebase origin main && git push origin main
fi
