#!/usr/bin/env bash
# Stop the G-TEC Auto Git Sync Background Daemon
cd "$(dirname "$0")/.." || exit 1

PID_FILE=".auto-sync.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "ℹ️  No PID file found. Auto Git Sync daemon does not appear to be running."
  # Check if any rogue process is running
  PIDS=$(pgrep -f "scripts/auto-git-sync.py")
  if [ -n "$PIDS" ]; then
    echo "Found running process with PID(s): $PIDS. Terminating..."
    kill $PIDS
    echo "✅ Stopped."
  fi
  exit 0
fi

PID=$(cat "$PID_FILE")
if ps -p "$PID" > /dev/null 2>&1; then
  echo "🛑 Stopping Auto Git Sync daemon (PID $PID)..."
  kill "$PID"
  rm -f "$PID_FILE"
  echo "✅ Daemon stopped successfully."
else
  echo "ℹ️  Process with PID $PID was not running."
  rm -f "$PID_FILE"
fi
