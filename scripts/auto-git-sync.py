#!/usr/bin/env python3
"""
G-TEC Autonomous Git Sync Daemon
Monitors the workspace repository, detects any file edits made by Antigravity or the user,
and automatically commits and pushes them to GitHub with an intelligent debounce timer.
"""

import os
import sys
import time
import signal
import subprocess
from datetime import datetime

# Prevent process termination when the launching terminal disconnects
if hasattr(signal, "SIGHUP"):
    signal.signal(signal.SIGHUP, signal.SIG_IGN)

# Root workspace directory (parent of scripts/)
REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEBOUNCE_SECONDS = 8      # Wait 8s of inactivity after last edit before committing/pushing
POLL_INTERVAL_SECONDS = 3 # Check for changes every 3 seconds
LOG_FILE = os.path.join(REPO_DIR, "auto-sync.log")
PID_FILE = os.path.join(REPO_DIR, ".auto-sync.pid")
BRANCH = "main"
REMOTE = "origin"

def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted = f"[{timestamp}] {msg}"
    print(formatted, flush=True)

def run_git(args, check=True):
    return subprocess.run(
        ["git"] + args,
        cwd=REPO_DIR,
        capture_output=True,
        text=True,
        check=check
    )

def get_git_status():
    try:
        res = run_git(["status", "--porcelain"], check=False)
        if res.returncode == 0:
            lines = [l.strip() for l in res.stdout.strip().split("\n") if l.strip()]
            # Filter out ignored internal log and pid files if not in gitignore
            filtered = [
                l for l in lines 
                if not any(f in l for f in ["auto-sync.log", ".auto-sync.pid", ".DS_Store"])
            ]
            return filtered
    except Exception as e:
        log(f"Error checking git status: {e}")
    return []

def get_changed_summary(status_lines):
    files = []
    for line in status_lines[:5]:
        parts = line.split(maxsplit=1)
        if len(parts) == 2:
            files.append(parts[1])
        elif len(parts) == 1:
            files.append(parts[0])
    
    extra = len(status_lines) - len(files)
    summary = ", ".join(files)
    if extra > 0:
        summary += f" and {extra} more"
    return summary

def sync_to_github(status_lines):
    changed_summary = get_changed_summary(status_lines)
    count = len(status_lines)
    log(f"Detected {count} changed file(s): {changed_summary}")
    
    # 1. Stage all changes
    log("Staging changes (git add -A)...")
    res_add = run_git(["add", "-A"], check=False)
    if res_add.returncode != 0:
        log(f"⚠️ Warning: git add failed: {res_add.stderr.strip()}")
        return False

    # Check if there is anything staged to commit
    res_diff = run_git(["diff", "--cached", "--quiet"], check=False)
    if res_diff.returncode == 0:
        log("No changes staged to commit.")
        return True

    # 2. Commit changes with timestamp and summary
    timestamp_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_msg = f"Auto-sync from Antigravity: update {changed_summary} [{timestamp_str}]"
    log(f"Committing changes: \"{commit_msg}\"")
    res_commit = run_git(["commit", "-m", commit_msg], check=False)
    if res_commit.returncode != 0:
        log(f"⚠️ Commit failed: {res_commit.stderr.strip()}")
        return False

    # 3. Push to remote
    log(f"Pushing commit to {REMOTE}/{BRANCH}...")
    res_push = run_git(["push", REMOTE, BRANCH], check=False)
    if res_push.returncode == 0:
        log(f"✅ SUCCESS: Successfully uploaded {count} file(s) to GitHub ({REMOTE}/{BRANCH})!")
        return True
    else:
        log(f"Push failed (exit {res_push.returncode}): {res_push.stderr.strip()}")
        log("Attempting git pull --rebase to synchronize...")
        res_pull = run_git(["pull", "--rebase", REMOTE, BRANCH], check=False)
        if res_pull.returncode == 0:
            log("Rebase succeeded, retrying push...")
            res_push_retry = run_git(["push", REMOTE, BRANCH], check=False)
            if res_push_retry.returncode == 0:
                log(f"✅ SUCCESS: Pushed to GitHub after rebase ({REMOTE}/{BRANCH})!")
                return True
        log(f"❌ Could not push to GitHub. Will retry on next cycle. Error: {res_push.stderr.strip()}")
        return False

def cleanup_pid():
    try:
        if os.path.exists(PID_FILE):
            with open(PID_FILE, "r") as f:
                stored = f.read().strip()
            if stored == str(os.getpid()):
                os.remove(PID_FILE)
    except Exception:
        pass

def main():
    # Record PID
    try:
        with open(PID_FILE, "w") as f:
            f.write(str(os.getpid()))
    except Exception as e:
        log(f"Warning: could not write PID file: {e}")

    log(f"🚀 G-TEC Auto Git Sync Daemon active for {REPO_DIR}")
    log(f"Target remote: {REMOTE} | Branch: {BRANCH} | Debounce: {DEBOUNCE_SECONDS}s")

    last_seen_state = None
    change_first_seen_time = None
    last_change_time = None

    try:
        while True:
            status_lines = get_git_status()
            current_state = tuple(status_lines)

            if current_state:
                # Changes exist in workspace
                now = time.time()
                if last_seen_state != current_state:
                    # New or further changes detected
                    last_seen_state = current_state
                    last_change_time = now
                    if change_first_seen_time is None:
                        change_first_seen_time = now
                        log(f"Changes detected ({len(status_lines)} files). Waiting {DEBOUNCE_SECONDS}s for edits to settle...")
                else:
                    # Changes are unchanged since last poll; check if quiet period elapsed
                    if last_change_time and (now - last_change_time >= DEBOUNCE_SECONDS):
                        # Debounce window satisfied! Sync now!
                        success = sync_to_github(status_lines)
                        last_seen_state = None
                        change_first_seen_time = None
                        last_change_time = None
            else:
                # Working tree clean
                last_seen_state = None
                change_first_seen_time = None
                last_change_time = None

            time.sleep(POLL_INTERVAL_SECONDS)
    except KeyboardInterrupt:
        log("Stopping Auto Git Sync Daemon (KeyboardInterrupt). Goodbye!")
    except Exception as e:
        log(f"Fatal error in sync daemon loop: {e}")
    finally:
        cleanup_pid()

if __name__ == "__main__":
    main()
