#!/bin/bash

# Portfolio Deployment Script
set -e

echo "🚀 Starting portfolio deployment..."

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p traefik certs

# Create acme.json file with correct permissions for Let's Encrypt
echo "🔐 Setting up SSL certificates..."
touch traefik/acme.json
chmod 600 traefik/acme.json

# Build and start services
echo "🏗️ Building and starting services..."
docker-compose up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "✅ Checking services status..."
docker-compose ps

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📊 Your portfolio is available at:"
echo "   🌐 https://portefolio.zeterack.fr"
echo ""
echo "🔧 Traefik dashboard available at:"
echo "   🌐 https://traefik.zeterack.fr"
echo "   👤 Username: admin"
echo "   🔑 Password: admin"
echo ""
echo "📝 Useful commands:"
echo "   docker-compose logs -f portfolio  # View portfolio logs"
echo "   docker-compose logs -f traefik    # View traefik logs"
echo "   docker-compose restart portfolio  # Restart portfolio"
echo "   docker-compose down               # Stop all services"
echo ""

# Show logs
echo "📋 Recent logs:"
docker-compose logs --tail=20 portfolio
