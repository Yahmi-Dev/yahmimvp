#!/bin/bash

# Yahmi Setup Script
echo "🚀 Setting up Yahmi..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env and add your credentials"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate
echo ""

# Check environment
echo "🔍 Checking environment configuration..."
npm run check:env
echo ""

# Test database connection
echo "🗄️  Testing database connection..."
npm run db:test
echo ""

# Push database schema
echo "📊 Pushing database schema..."
npm run db:push
echo ""

echo "✅ Setup complete!"
echo ""
echo "To start the development servers:"
echo "  npm run dev"
echo ""
echo "Or start them separately:"
echo "  Terminal 1: npm run dev:server"
echo "  Terminal 2: npm run dev:client"
echo ""
