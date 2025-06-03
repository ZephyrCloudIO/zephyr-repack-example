#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define the ports as a constant variable
PORTS=(8081 9000 9001 9002 9003)

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Source the kill-mobile-development-servers.sh script to use the kill_mobile_development_servers function
source "$SCRIPT_DIR/kill-mobile-development-servers.sh"

# Set the trap to execute kill_mobile_development_servers on script exit
trap 'kill_mobile_development_servers "${PORTS[@]}"' EXIT

echo "🚀 Starting Android Maestro tests..."

# Start the mobile servers in the background
echo "🔧 Starting mobile servers..."
pnpm install -g concurrently
ZC="$ZC" ZE_SECRET_TOKEN="$ZE_SECRET_TOKEN" pnpm run start:mobile:concurrently & # runs in background
echo "✅ Mobile servers started successfully."

# Run adb reverse scripts to set up port forwarding
echo "🔄 Running adbreverse scripts to set up port forwarding..."
pnpm adbreverse
echo "✅ adbreverse executed successfully."

echo "Setup local rnef config"
RNEF_PATH="apps/mobile-host/.rnef/cache"
mkdir -p "$RNEF_PATH"
echo "Write github token into project.json"
echo "{\"githubToken\": \"$GITHUB_TOKEN\"}" > "$RNEF_PATH/project.json"

# Build and install the mobile app on the device
echo "📱 Building and installing the app on the device..."
pnpm run:mobile-host:android --variant="$MODE"
echo "✅ App built and installed successfully."

# Run the end-to-end test scripts
echo "🧪 Running end-to-end test scripts..."
pnpm --filter mobile-e2e test:all
echo "✅ Test scripts executed successfully."

echo "🎉 All commands executed successfully. Android Maestro tests completed."
