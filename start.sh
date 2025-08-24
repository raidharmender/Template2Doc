#!/bin/bash

echo "🚀 Starting Offer Letter Application..."
echo "======================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install it and try again."
    exit 1
fi

echo "✅ Docker and docker-compose are available"

# Create offer_letters directory if it doesn't exist
mkdir -p offer_letters

echo "🔨 Building and starting containers..."
docker-compose up --build -d

echo "⏳ Waiting for services to start..."
sleep 10

echo "🧪 Testing application health..."
python3 test_applications.py

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Application is running successfully!"
    echo ""
    echo "Access your application at:"
    echo "Frontend: http://localhost:3000"
    echo "Backend API: http://localhost:8000"
    echo "Backend Health: http://localhost:8000/health"
    echo ""
    echo "To stop the application, run: docker-compose down"
    echo "To view logs, run: docker-compose logs -f"
else
    echo ""
    echo "❌ Some tests failed. Check the logs above for details."
    echo "To view container logs, run: docker-compose logs"
fi
