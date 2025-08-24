#!/bin/bash

echo "🛑 Stopping Offer Letter Application..."
echo "======================================"

# Stop and remove containers
docker-compose down

echo "✅ Application stopped successfully!"
echo ""
echo "To start again, run: ./start.sh"
echo "To remove all data, run: docker-compose down -v"
