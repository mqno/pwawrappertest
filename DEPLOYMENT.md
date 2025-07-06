# PWA Deployment Guide

This guide explains how to deploy your Progressive Web App using Docker and Next.js standalone mode.

## 🚀 Quick Deployment

### Using Docker Compose (Recommended)

```bash
# Production deployment
npm run docker:prod

# Development with hot reload
npm run docker:dev
```

### Using Docker directly

```bash
# Build and deploy
npm run docker:deploy

# Or step by step
npm run docker:build
npm run docker:run
```

### Using the deployment script

```bash
npm run deploy
```

## 📦 Docker Configuration

### Production Dockerfile

- Multi-stage build for optimized image size
- Uses Node.js 18 Alpine for security and size
- Standalone output for minimal runtime dependencies
- Non-root user for security

### Development Dockerfile

- Hot reload support
- Volume mounting for live code changes
- Development environment configuration

## 🔧 Environment Variables

### Production

- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`
- `PORT=3000`
- `HOSTNAME=0.0.0.0`

### Development

- `NODE_ENV=development`
- Hot reload enabled

## 🌐 Access Points

- **Production**: http://localhost:3000
- **Development**: http://localhost:3001
- **Health Check**: http://localhost:3000/api/health

## 📱 PWA Features

Your PWA includes:

- ✅ Service Worker for offline functionality
- ✅ Web App Manifest for installation
- ✅ Responsive design for all devices
- ✅ Dark/Light mode support
- ✅ Accessibility features
- ✅ Push notifications
- ✅ Cache management

## 🔍 Health Monitoring

The application includes a health check endpoint:

```bash
curl http://localhost:3000/api/health
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

## 🐳 Docker Commands

### Build Image

```bash
docker build -t pwa-app .
```

### Run Container

```bash
docker run -d --name pwa-app -p 3000:3000 pwa-app
```

### View Logs

```bash
docker logs pwa-app
```

### Stop Container

```bash
docker stop pwa-app
```

### Remove Container

```bash
docker rm pwa-app
```

## 🔄 Updates

To update your deployed PWA:

1. Pull latest changes
2. Rebuild the Docker image
3. Restart the container

```bash
git pull
npm run docker:deploy
```

## 📊 Performance

The standalone build provides:

- Minimal runtime dependencies
- Optimized bundle size
- Fast startup times
- Reduced memory footprint

## 🔒 Security

- Non-root user execution
- Minimal attack surface
- Alpine Linux base image
- Production-optimized configuration
