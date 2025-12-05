// Yahmi API Server - Express + Neon + Vercel AI SDK
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { prisma, testConnection, healthCheck } from '../src/lib/db.js';
import * as auth from '../src/lib/auth.js';
import * as ai from '../src/lib/ai-vercel.js';

// Environment validation - with fallback for development
let env: any;
let isProduction: boolean;
let isDevelopment: boolean;
let sanitizeForLog: any;

try {
  const envModule = await import('../src/lib/env.js');
  env = envModule.env;
  isProduction = envModule.isProduction;
  isDevelopment = envModule.isDevelopment;
  sanitizeForLog = envModule.sanitizeForLog;
} catch (error) {
  console.warn('⚠️  Environment validation skipped (development mode)');
  env = {
    PORT: parseInt(process.env.PORT || '3001', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
    VITE_API_URL: process.env.VITE_API_URL
  };
  isProduction = env.NODE_ENV === 'production';
  isDevelopment = env.NODE_ENV === 'development';
  sanitizeForLog = (data: any) => data;
}

const app = express();
const PORT = env.PORT;

// Security: Configure CORS properly with more permissive development settings
const corsOptions = {
  origin: function (origin: any, callback: any) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = isProduction 
      ? [env.VITE_API_URL, 'https://yahmi.vercel.app'].filter(Boolean)
      : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'];
    
    if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else if (isDevelopment) {
      // In development, allow all localhost origins
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Security: Add security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Request logging (sanitized)
app.use((req, res, next) => {
  if (!isProduction) {
    console.log(`${req.method} ${req.path}`, sanitizeForLog(req.body));
  }
  next();
});

// Middleware: Verify auth token
async function requireAuth(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token || token.length < 10) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
    }

    const user = await auth.getUserFromToken(token);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Unauthorized - Authentication failed' });
  }
}

// Middleware: Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
  return (req: any, res: any, next: any) => {
    const identifier = req.user?.id || req.ip || 'anonymous';
    const now = Date.now();
    
    const record = rateLimitMap.get(identifier);
    
    if (!record || now > record.resetTime) {
      rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (record.count >= maxRequests) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((record.resetTime - now) / 1000)
      });
    }
    
    record.count++;
    next();
  };
}

// Error handling middleware
function errorHandler(err: any, req: any, res: any, next: any) {
  console.error('Server error:', sanitizeForLog(err));
  
  if (res.headersSent) {
    return next(err);
  }
  
  const statusCode = err.statusCode || 500;
  const message = isProduction 
    ? 'An error occurred. Please try again later.'
    : err.message || 'Internal server error';
  
  res.status(statusCode).json({ 
    error: message,
    ...(isDevelopment && { stack: err.stack })
  });
}

// ============================================
// AUTH ROUTES
// ============================================

app.post('/api/auth/signup', rateLimit(10, 60 * 60 * 1000), async (req, res) => {
  try {
    const { email, password, ...additionalData } = req.body;
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }
    
    const result = await auth.signUp(email, password, additionalData);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/signin', rateLimit(20, 60 * 60 * 1000), async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const result = await auth.signIn(email, password);
    res.json(result);
  } catch (error: any) {
    // Don't reveal whether user exists or password is wrong
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/signout', requireAuth, async (req: any, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    await auth.signOut(token);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/auth/me', requireAuth, async (req: any, res) => {
  res.json({ user: req.user });
});

// ============================================
// USER PROFILE ROUTES
// ============================================

app.get('/api/profile', requireAuth, async (req: any, res) => {
  try {
    const profile = await auth.getUserProfile(req.user.id);
    res.json(profile);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/profile', requireAuth, async (req: any, res) => {
  try {
    const updated = await auth.updateUserProfile(req.user.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================
// ASSESSMENT ROUTES
// ============================================

app.post('/api/assessment/generate', requireAuth, async (req: any, res) => {
  try {
    const { industry, companySize, company } = req.body;
    const questions = await ai.generateAssessment({ industry, companySize, company });
    res.json({ questions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/assessment/submit', requireAuth, async (req: any, res) => {
  try {
    const { industry, responses, carbonScore, esgScore } = req.body;
    
    const assessment = await prisma.assessment.create({
      data: {
        userId: req.user.id,
        industry,
        responses,
        carbonScore,
        esgScore,
      },
    });
    
    res.json(assessment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/assessments', requireAuth, async (req: any, res) => {
  try {
    const assessments = await prisma.assessment.findMany({
      where: { userId: req.user.id },
      orderBy: { completedAt: 'desc' },
    });
    res.json(assessments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// REPORT ROUTES
// ============================================

app.post('/api/report/generate', requireAuth, async (req: any, res) => {
  try {
    const { assessmentId, responses } = req.body;
    
    // Generate AI report
    const aiReport = await ai.generateESGReport(responses);
    
    // Save to database
    const report = await prisma.report.create({
      data: {
        userId: req.user.id,
        assessmentId,
        carbonFootprint: aiReport.score,
        esgScore: aiReport.score,
        aiReport,
        recommendations: aiReport.suggestions,
        environmentalScore: aiReport.environmentalScore,
        socialScore: aiReport.socialScore,
        governanceScore: aiReport.governanceScore,
        riskLevel: aiReport.riskLevel,
        benchmarkPosition: aiReport.benchmarkPosition,
        complianceGaps: aiReport.complianceGaps,
        quickWins: aiReport.quickWins,
        longTermGoals: aiReport.longTermGoals,
      },
    });
    
    res.json(report);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reports', requireAuth, async (req: any, res) => {
  try {
    const reports = await prisma.report.findMany({
      where: { userId: req.user.id },
      orderBy: { generatedAt: 'desc' },
      include: { assessment: true },
    });
    res.json(reports);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reports/latest', requireAuth, async (req: any, res) => {
  try {
    const report = await prisma.report.findFirst({
      where: { userId: req.user.id },
      orderBy: { generatedAt: 'desc' },
      include: { assessment: true },
    });
    res.json(report);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// DEEP ANALYTICS ROUTES
// ============================================

app.post('/api/analytics/deep', requireAuth, async (req: any, res) => {
  try {
    const { reportId, company, latestReport, responses } = req.body;
    
    // Generate deep analytics
    const deepReport = await ai.generateDeepAnalytics({
      userId: req.user.id,
      company,
      latestReport,
      responses,
    });
    
    // Save to database
    const analytics = await prisma.deepAnalytics.create({
      data: {
        userId: req.user.id,
        reportId,
        deepReport,
        scope1Emissions: deepReport.emissions?.scope1,
        scope2Emissions: deepReport.emissions?.scope2,
        scope3Emissions: deepReport.emissions?.scope3,
        intensityPerUnit: deepReport.intensity?.perUnit,
        intensityPerRevenue: deepReport.intensity?.perRevenue,
        renewablesShare: deepReport.energy?.renewablesShare,
        circularityScore: deepReport.circularity?.score,
        engagementIndex: deepReport.people?.engagementIndex,
      },
    });
    
    res.json(analytics);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/latest', requireAuth, async (req: any, res) => {
  try {
    const analytics = await prisma.deepAnalytics.findFirst({
      where: { userId: req.user.id },
      orderBy: { generatedAt: 'desc' },
    });
    res.json(analytics);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// DASHBOARD ROUTES
// ============================================

app.get('/api/dashboard', requireAuth, async (req: any, res) => {
  try {
    const [profile, assessments, latestReport, latestAnalytics] = await Promise.all([
      auth.getUserProfile(req.user.id),
      prisma.assessment.findMany({
        where: { userId: req.user.id },
        orderBy: { completedAt: 'desc' },
        take: 5,
      }),
      prisma.report.findFirst({
        where: { userId: req.user.id },
        orderBy: { generatedAt: 'desc' },
      }),
      prisma.deepAnalytics.findFirst({
        where: { userId: req.user.id },
        orderBy: { generatedAt: 'desc' },
      }),
    ]);
    
    res.json({
      profile,
      assessments,
      latestReport,
      latestAnalytics,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Health check with database status
app.get('/health', async (req, res) => {
  const dbHealth = await healthCheck();
  res.json({ 
    status: dbHealth.healthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    database: dbHealth
  });
});

// Database connection test endpoint
app.get('/api/health/db', requireAuth, async (req, res) => {
  const dbHealth = await healthCheck();
  res.json(dbHealth);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing server gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Initialize database connection and start server
async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Server will start but may not function properly.');
      if (isProduction) {
        process.exit(1); // Exit in production if DB is not available
      }
    }
    
    // Start server
    if (!isProduction || process.env.VERCEL !== '1') {
      app.listen(PORT, () => {
        console.log(`🚀 Yahmi API Server running on http://localhost:${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/health`);
        console.log(`🌍 Environment: ${env.NODE_ENV}`);
        console.log(`🔐 CORS enabled for: ${isDevelopment ? 'localhost (all ports)' : env.VITE_API_URL}`);
      });
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default app;
