#!/usr/bin/env bash
set -euo pipefail

# Build production
echo "Building production bundle..."
npm run build

RELEASE_DIR=release
ZIP_NAME="release-$(date +%Y%m%d%H%M%S).zip"

mkdir -p "$RELEASE_DIR"
rm -f "$RELEASE_DIR/$ZIP_NAME"

# Files to include in release
FILES=(dist/main.js manifest.json styles.css)

# Include assets folder if present
if [ -d "assets" ]; then
  (cd assets && zip -r "../$RELEASE_DIR/assets.zip" .) || true
  FILES+=("$RELEASE_DIR/assets.zip")
fi

# Create release zip
zip -j "$RELEASE_DIR/$ZIP_NAME" "${FILES[@]}"

echo "Created $RELEASE_DIR/$ZIP_NAME"

# Print files
ls -la "$RELEASE_DIR"
