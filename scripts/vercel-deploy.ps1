# Yahmi - Vercel Deployment Script (PowerShell)
# This script automates the deployment process for Windows

$ErrorActionPreference = "Stop"

Write-Host "🚀 Yahmi Vercel Deployment Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "❌ Error: .env file not found" -ForegroundColor Red
    Write-Host "Please create .env file with required variables"
    exit 1
}

# Load environment variables from .env
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim().Trim('"').Trim("'")
        [Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
}

# Check required variables
$requiredVars = @("DATABASE_URL", "JWT_SECRET", "GROQ_API_KEY", "OPENROUTER_API_KEY")
$missingVars = @()

foreach ($var in $requiredVars) {
    if (-not [Environment]::GetEnvironmentVariable($var, "Process")) {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host "❌ Missing required environment variables:" -ForegroundColor Red
    foreach ($var in $missingVars) {
        Write-Host "  - $var"
    }
    exit 1
}

Write-Host "✅ Environment variables validated" -ForegroundColor Green
Write-Host ""

# Test database connection
Write-Host "🔍 Testing database connection..." -ForegroundColor Yellow
try {
    npm run db:test
    Write-Host "✅ Database connection successful" -ForegroundColor Green
} catch {
    Write-Host "❌ Database connection failed" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
try {
    npx prisma generate
    Write-Host "✅ Prisma client generated" -ForegroundColor Green
} catch {
    Write-Host "❌ Prisma generation failed" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Push database schema (optional)
$pushSchema = Read-Host "Do you want to push database schema to Neon? (y/n)"
if ($pushSchema -eq "y" -or $pushSchema -eq "Y") {
    Write-Host "📤 Pushing database schema..." -ForegroundColor Yellow
    npx prisma db push
    Write-Host "✅ Database schema pushed" -ForegroundColor Green
}
Write-Host ""

# Build project
Write-Host "🏗️  Building project..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "✅ Build successful" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "⚠️  Vercel CLI not found" -ForegroundColor Yellow
    $installVercel = Read-Host "Do you want to install Vercel CLI? (y/n)"
    if ($installVercel -eq "y" -or $installVercel -eq "Y") {
        npm install -g vercel
    } else {
        Write-Host "Please install Vercel CLI: npm install -g vercel"
        exit 1
    }
}

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT: Make sure you've set environment variables in Vercel Dashboard" -ForegroundColor Yellow
Write-Host "   Go to: https://vercel.com/[your-project]/settings/environment-variables"
Write-Host ""
$envVarsSet = Read-Host "Have you set all environment variables in Vercel? (y/n)"
if ($envVarsSet -ne "y" -and $envVarsSet -ne "Y") {
    Write-Host "❌ Please set environment variables in Vercel first" -ForegroundColor Red
    Write-Host ""
    Write-Host "Required variables:"
    Write-Host "  - DATABASE_URL"
    Write-Host "  - JWT_SECRET"
    Write-Host "  - VITE_JWT_SECRET"
    Write-Host "  - GROQ_API_KEY"
    Write-Host "  - OPENROUTER_API_KEY"
    Write-Host "  - NODE_ENV=production"
    Write-Host "  - VITE_APP_URL=https://yahmimvp.vercel.app"
    Write-Host "  - VITE_API_URL=https://yahmimvp.vercel.app"
    exit 1
}

# Deploy
vercel --prod

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Your app should be live at: https://yahmimvp.vercel.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps:"
Write-Host "  1. Test the health endpoint: curl https://yahmimvp.vercel.app/api/health"
Write-Host "  2. Test authentication: Try signing up at https://yahmimvp.vercel.app/auth"
Write-Host "  3. Check logs in Vercel Dashboard"
Write-Host "  4. Monitor database in Neon Console"
Write-Host ""
Write-Host "📖 For troubleshooting, see: VERCEL_DEPLOYMENT_GUIDE.md"
