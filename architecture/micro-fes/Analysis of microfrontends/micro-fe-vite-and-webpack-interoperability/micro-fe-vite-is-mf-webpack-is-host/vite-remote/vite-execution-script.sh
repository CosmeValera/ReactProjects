#!/bin/bash

PORT="$1"

# If the port is already in use, then kill the PID related to that port
PID=$(netstat -ano | grep ":${PORT} " | grep LISTENING | awk '{print $5}')

if [ -n "$PID" ]; then
    taskkill //F //PID $PID
fi

# Run 'npm run build --watch' in the background and store its process ID
npm run build &
BUILD_WATCH_PID=$!

# Wait for a brief moment to ensure the 'build --watch' process is up and running
sleep 2

# Run 'npm run preview' also in the background and store its process ID
npm run preview &
PREVIEW_PID=$!

printf 'Welcome: %s\n' "$BUILD_WATCH_PID $PREVIEW_PID"

# Wait for any background job to finish (if one finishes, they both should be killed)
wait -n

# Kill both processes if they are still running
kill $BUILD_WATCH_PID $PREVIEW_PID 2>/dev/null
