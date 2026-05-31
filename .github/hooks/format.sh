#!/usr/bin/env bash
# Reads the hook payload from stdin and runs prettier only for create/edit tools.
PAYLOAD=$(cat)
TOOL_NAME=$(echo "$PAYLOAD" | grep -o '"toolName"[[:space:]]*:[[:space:]]*"[^"]*"' | grep -o '"[^"]*"$' | tr -d '"')

case "$TOOL_NAME" in
  create|edit)
    npx prettier --write .
    ;;
esac
