#!/bin/bash

THRESHOLD=${1:-90}
ALERT=0

df -h | awk 'NR>1 {print $1, $5}' | while read fs usage; do

    # Skip entries that are not percentages
    if [[ "$usage" != *% ]]; then
        continue
    fi

    percent=${usage%\%}

    if [ "$percent" -ge "$THRESHOLD" ]; then
        echo "WARNING: $fs is at $percent% (threshold: $THRESHOLD%)"
        ALERT=1
    else
        echo "OK: $fs is at $percent%"
    fi

done

exit $ALERT

