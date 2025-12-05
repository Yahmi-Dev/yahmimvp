#!/usr/bin/env node

// Environment variable checker for development
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking environment configuration...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found!');
  console.log('📝 Please copy .env.example to .env and fill in your values:');
  console.log('   cp .env.example .env\n');
  process.exit(1);
}

// Load .env file
require('dotenv').config();

// Required variables
const required = {
  'DATABASE_URL': 'Neon PostgreSQL connection string',
  'JWT_SECRET': 'JWT secret key (min 32 characters)',
  'GROQ_API_KEY': 'Groq API key',
  'OPENROUTER_API_KEY': 'OpenRouter API key'
};

let hasErrors = false;
let hasWarnings = false;

// Check each required variable
for (const [key, description] of Object.entries(required)) {
  const value = process.env[key];
  
  if (!value) {
    console.error(`❌ ${key} is missing`);
    console.log(`   Description: ${description}\n`);
    hasErrors = true;
  } else if (value.includes('your_') || value.includes('your-')) {
    console.warn(`⚠️  ${key} appears to be a placeholder`);
    console.log(`   Please replace with actual value\n`);
    hasWarnings = true;
  } else {
    console.log(`✅ ${key} is set`);
  }
}

// Check JWT_SECRET length
if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
  console.warn(`⚠️  JWT_SECRET is too short (${process.env.JWT_SECRET.length} characters)`);
  console.log(`   Recommended: At least 32 characters for security\n`);
  hasWarnings = true;
}

// Check DATABASE_URL format
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('postgresql://')) {
  console.error('❌ DATABASE_URL must start with postgresql://');
  hasErrors = true;
}

// Check if SSL is enabled in DATABASE_URL
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('sslmode=require')) {
  console.warn('⚠️  DATABASE_URL should include ?sslmode=require for security');
  hasWarnings = true;
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.error('\n❌ Environment check failed!');
  console.log('Please fix the errors above before starting the server.\n');
  process.exit(1);
} else if (hasWarnings) {
  console.warn('\n⚠️  Environment check passed with warnings');
  console.log('Consider fixing the warnings above for better security.\n');
} else {
  console.log('\n✅ Environment check passed!');
  console.log('All required variables are set correctly.\n');
}
