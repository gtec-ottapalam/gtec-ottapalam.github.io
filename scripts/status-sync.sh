#!/usr/bin/env bash
# Check status of the G-TEC Auto Git Sync Background Daemon
cd "$(dirname "$0")/.." || exit 1

PID_FILE=".auto-sync.pid"
LOG_FILE="auto-sync.log"

echo "=========================================================="
echo "          G-TEC Auto Git Sync Daemon Status               "
echo "=========================================================="

if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if ps -p "$PID" > /dev/null 2>&1; then
    echo "Status:   🟢 RUNNING (PID $PID)"
    echo "Runtime:  $(ps -o etime= -p "$PID" 2>/dev/null | tr -d ' ')"
  else
    echo "Status:   🔴 STOPPED (Stale PID file found)"
  fi
else
  PIDS=$(pgrep -f "scripts/auto-git-sync.py")
  if [ -n "$PIDS" ]; then
    echo "Status:   🟢 RUNNING (PID $PIDS, PID file missing)"
  else
    echo "Status:   ⚪ NOT RUNNING"
  fi
fi

echo "Branch:   $(git branch --show-current 2>/dev/null || echo 'unknown')"
echo "Remote:   $(git remote get-url origin 2>/dev/null || echo 'unknown')"
echo ""
echo "--- Current Working Tree Status ---"
git status --short
if [ -z "$(git status --porcelain)" ]; then
  echo "(clean - all files committed)"
fi

echo ""
echo "--- Recent Activity Log (last 10 entries) ---"
if [ -f "$LOG_FILE" ]; then
  tail -n 10 "$LOG_FILE"
else
  echo "(no log file yet)"
fi
echo "=========================================================="
