#!/usr/bin/env bash
# Universal Web Video Optimization Script for RAY Web App
# Applies:
# 1. -movflags +faststart (Moov atom to head for instant streaming playback)
# 2. -crf 22 (High quality web encoding, reducing 100MB files to ~15-30MB)
# 3. -pix_fmt yuv420p (Universal browser/mobile compatibility)
# 4. -c:a aac -b:a 160k (Crisp stereo audio)

set -e

VIDEO_DIR="/app/applet/public/videos"
DIST_DIR="/app/applet/dist/videos"
mkdir -p "$VIDEO_DIR"
mkdir -p "$DIST_DIR"

echo "=== Optimizing all MP4 videos for instant streaming ==="

for f in "$VIDEO_DIR"/*.mp4; do
  [ -e "$f" ] || continue
  filename=$(basename "$f")
  tmp_file="/tmp/opt_${filename}"
  
  echo "Processing: $filename"
  ffmpeg -y -i "$f" \
    -c:v libx264 -preset fast -crf 22 \
    -c:a aac -b:a 160k \
    -pix_fmt yuv420p \
    -movflags +faststart \
    "$tmp_file" -loglevel error
    
  mv -f "$tmp_file" "$f"
  cp -f "$f" "$DIST_DIR/$filename"
  echo "Optimized: $filename ($(du -h "$f" | cut -f1))"
done

echo "=== All videos optimized for fast streaming playback! ==="
