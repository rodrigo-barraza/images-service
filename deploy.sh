#!/bin/bash
# ============================================================
# Images Service — Build & Deploy
#
# Thin wrapper — all logic lives in ../deploy-kit/lib.sh
#
# Usage:
#   npm run deploy              # full deploy
#   npm run deploy -- --dry-run # validate without deploying
#   npm run deploy -- --skip-pull
#   npm run deploy -- --no-cache
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IMAGE_NAME="images-service"
DISPLAY_NAME="🖼️ Images Service"

source "${SCRIPT_DIR}/../deploy-kit/lib.sh"
