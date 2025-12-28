#!/bin/bash

PROCESS=$1
INTERVAL=$2

if [ -z "$PROCESS" ] || [ -z "$INTERVAL" ]; then
    echo "Usage: $0 <process-name> <interval-seconds>"
    exit 1
fi

while true; do
    TIME=$(date "+%Y-%m-%d %H:%M:%S")

    if pgrep "$PROCESS" > /dev/null; then
        echo "$TIME - $PROCESS is running"
    else
        echo "$TIME - $PROCESS has stopped"
        exit 0
    fi

    sleep "$INTERVAL"
done

