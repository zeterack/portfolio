#!/bin/bash

# Portfolio Stop Script
set -e

echo "🛑 Stopping portfolio services..."

# Stop all services
docker-compose down

echo "🧹 Cleaning up unused resources..."
docker system prune -f

echo "✅ Portfolio services stopped successfully!"
echo ""
echo "📝 To restart services, run:"
echo "   ./deploy.sh"
