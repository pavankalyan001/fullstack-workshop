#!/bin/bash

SRC=$1
DEST=$2

if [ -z "$SRC" ] || [ -z "$DEST" ]; then
    echo "Usage: $0 <source-directory> <backup-destination>"
    exit 1
fi

if [ ! -d "$SRC" ]; then
    echo "Source directory does not exist"
    exit 1
fi

mkdir -p "$DEST"

TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_FILE="$DEST/backup-$TIMESTAMP.tar.gz"

tar -czf "$BACKUP_FILE" "$SRC"

# Keep only last 5 backups
ls -t "$DEST"/backup-*.tar.gz | tail -n +6 | xargs rm -f 2>/dev/null

echo "Backup created: $BACKUP_FILE"
du -h "$BACKUP_FILE"

