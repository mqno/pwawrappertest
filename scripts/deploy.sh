#!/bin/bash

# PWA Deployment Script
set -e

echo "🚀 Starting PWA deployment..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t pwa-app .

# Stop existing container if running
echo "🛑 Stopping existing container..."
docker stop pwa-app || true
docker rm pwa-app || true

# Run the new container
echo "▶️ Starting new container..."
docker run -d \
  --name pwa-app \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  pwa-app

echo "✅ PWA deployed successfully!"
echo "🌐 Access your PWA at: http://localhost:3000"
echo "📱 PWA is ready for installation!" 