// Environment variable validation and configuration
// This ensures all required environment variables are present

interface EnvConfig {
  DATABASE_URL: string;
  JWT_SECRET: string;
  GROQ_API_KEY: string;
  OPENROUTER_API_KEY: string;
  NODE_ENV: string;
  PORT: number;
  VITE_API_URL?: string;
}

function validateEnv(): EnvConfig {
  const isDev = process.env.NODE_ENV !== 'production';
  
  const requiredVars = [
    'DATABASE_URL',
    'GROQ_API_KEY',
    'OPENROUTER_API_KEY'
  ];

  // JWT_SECRET can be either JWT_SECRET or VITE_JWT_SECRET
  const jwtSecret = process.env.JWT_SECRET || process.env.VITE_JWT_SECRET;
  
  if (!jwtSecret) {
    requiredVars.push('JWT_SECRET or VITE_JWT_SECRET');
  }

  const missing = requiredVars.filter(varName => {
    if (varName.includes('or')) return false; // Skip the JWT check as we handled it above
    return !process.env[varName];
  });

  if (missing.length > 0) {
    const errorMsg = `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.';
    
    if (isDev) {
      console.warn('⚠️  ' + errorMsg);
    } else {
      throw new Error(errorMsg);
    }
  }

  // Validate JWT_SECRET length (warning in dev, error in prod)
  if (jwtSecret && jwtSecret.length < 32) {
    const msg = 'JWT_SECRET should be at least 32 characters long for security';
    if (isDev) {
      console.warn('⚠️  ' + msg);
    } else {
      throw new Error(msg);
    }
  }

  // Validate DATABASE_URL format
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('postgresql://')) {
    const msg = 'DATABASE_URL must be a valid PostgreSQL connection string';
    if (isDev) {
      console.warn('⚠️  ' + msg);
    } else {
      throw new Error(msg);
    }
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: jwtSecret || 'dev-secret-key-change-in-production',
    GROQ_API_KEY: process.env.GROQ_API_KEY || '',
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3001', 10),
    VITE_API_URL: process.env.VITE_API_URL
  };
}

export const env = validateEnv();

// Helper to check if we're in production
export const isProduction = env.NODE_ENV === 'production';

// Helper to check if we're in development
export const isDevelopment = env.NODE_ENV === 'development';

// Sanitize sensitive data from logs
export function sanitizeForLog(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized = { ...data };
  const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'api_key'];

  for (const key in sanitized) {
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeForLog(sanitized[key]);
    }
  }

  return sanitized;
}
