#!/bin/bash

# Yahmi v2.0 - Deployment Script

echo "🚀 Yahmi v2.0 - Deployment"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Yahmi v2.0"
    echo "✅ Git repository initialized"
    echo ""
fi

# Build the project
echo "🔨 Building project..."
npm run build
echo "✅ Build complete"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
    echo ""
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo ""
echo "Make sure you have set these environment variables in Vercel:"
echo "- DATABASE_URL"
echo "- VITE_JWT_SECRET"
echo "- AI_GATEWAY_API_KEY"
echo "- VITE_APP_URL"
echo ""
read -p "Press enter to continue with deployment..."

vercel deploy --prod

echo ""
echo "================================"
echo "✅ Deployment complete!"
echo "================================"
