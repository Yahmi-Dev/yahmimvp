#!/bin/bash

# Yahmi - Vercel Deployment Script
# This script automates the deployment process

set -e

echo "🚀 Yahmi Vercel Deployment Script"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create .env file with required variables"
    exit 1
fi

# Load environment variables
source .env

# Check required variables
REQUIRED_VARS=("DATABASE_URL" "JWT_SECRET" "GROQ_API_KEY" "OPENROUTER_API_KEY")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo -e "${RED}❌ Missing required environment variables:${NC}"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    exit 1
fi

echo -e "${GREEN}✅ Environment variables validated${NC}"
echo ""

# Test database connection
echo "🔍 Testing database connection..."
npm run db:test
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Database connection failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Database connection successful${NC}"
echo ""

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Prisma generation failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Prisma client generated${NC}"
echo ""

# Push database schema (optional)
read -p "Do you want to push database schema to Neon? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Pushing database schema..."
    npx prisma db push
    echo -e "${GREEN}✅ Database schema pushed${NC}"
fi
echo ""

# Build project
echo "🏗️  Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build successful${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found${NC}"
    read -p "Do you want to install Vercel CLI? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install -g vercel
    else
        echo "Please install Vercel CLI: npm install -g vercel"
        exit 1
    fi
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Make sure you've set environment variables in Vercel Dashboard${NC}"
echo "   Go to: https://vercel.com/[your-project]/settings/environment-variables"
echo ""
read -p "Have you set all environment variables in Vercel? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Please set environment variables in Vercel first${NC}"
    echo ""
    echo "Required variables:"
    echo "  - DATABASE_URL"
    echo "  - JWT_SECRET"
    echo "  - VITE_JWT_SECRET"
    echo "  - GROQ_API_KEY"
    echo "  - OPENROUTER_API_KEY"
    echo "  - NODE_ENV=production"
    echo "  - VITE_APP_URL=https://yahmimvp.vercel.app"
    echo "  - VITE_API_URL=https://yahmimvp.vercel.app"
    exit 1
fi

# Deploy
vercel --prod

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "🎉 Your app should be live at: https://yahmimvp.vercel.app"
echo ""
echo "📋 Next steps:"
echo "  1. Test the health endpoint: curl https://yahmimvp.vercel.app/api/health"
echo "  2. Test authentication: Try signing up at https://yahmimvp.vercel.app/auth"
echo "  3. Check logs in Vercel Dashboard"
echo "  4. Monitor database in Neon Console"
echo ""
echo "📖 For troubleshooting, see: VERCEL_DEPLOYMENT_GUIDE.md"
