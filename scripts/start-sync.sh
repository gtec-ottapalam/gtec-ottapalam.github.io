#!/usr/bin/env bash
# Start the G-TEC Auto Git Sync Background Daemon
cd "$(dirname "$0")/.." || exit 1

PID_FILE=".auto-sync.pid"
LOG_FILE="auto-sync.log"

if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if ps -p "$PID" > /dev/null 2>&1; then
    echo "⚠️  Auto Git Sync daemon is already running with PID $PID."
    echo "View logs with: tail -f $LOG_FILE"
    exit 0
  else
    rm -f "$PID_FILE"
  fi
fi

echo "🚀 Starting G-TEC Auto Git Sync Daemon in background..."
nohup /usr/bin/python3 -u scripts/auto-git-sync.py </dev/null >> "$LOG_FILE" 2>&1 &
NEW_PID=$!
disown "$NEW_PID" 2>/dev/null || true

sleep 1

if ps -p "$NEW_PID" > /dev/null 2>&1; then
  echo "✅ Auto Git Sync Daemon is running with PID $NEW_PID."
  echo "Every change made in Antigravity or saved locally will automatically upload to GitHub!"
  echo ""
  echo "Helpful commands:"
  echo "  Check status:   ./scripts/status-sync.sh"
  echo "  View live logs: tail -f auto-sync.log"
  echo "  Stop daemon:    ./scripts/stop-sync.sh"
else
  echo "❌ Error starting daemon. Check auto-sync.log for details."
  cat "$LOG_FILE"
  exit 1
fi
