#!/bin/bash

# Check input
if [ $# -eq 0 ]; then
    echo "Usage: $0 <logfile>"
    exit 1
fi

LOG_FILE=$1

# Check file exists
if [ ! -f "$LOG_FILE" ]; then
    echo "File not found!"
    exit 1
fi

# Counts
TOTAL=$(wc -l < "$LOG_FILE")
INFO=$(grep -c "INFO" "$LOG_FILE")
WARNING=$(grep -c "WARNING" "$LOG_FILE")
ERROR=$(grep -c "ERROR" "$LOG_FILE")

# Output
echo "===== LOG REPORT ====="
echo "Total Lines : $TOTAL"
echo "INFO        : $INFO"
echo "WARNING     : $WARNING"
echo "ERROR       : $ERROR"
echo "----------------------"

# Unique IPs
echo "IP Addresses:"
grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' "$LOG_FILE" | sort -u
echo "======================"

