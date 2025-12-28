#!/bin/bash

DIR=$1

if [ -z "$DIR" ] || [ ! -d "$DIR" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

cd "$DIR" || exit 1

for file in *.*; do
    ext="${file##*.}"
    mkdir -p "$ext"
    mv "$file" "$ext/" 2>/dev/null
done

echo "File organization completed."
