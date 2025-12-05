// Vercel Serverless API Handler
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import { prisma } from '../src/lib/db.js';
import * as auth from '../src/lib/auth.js';
import * as ai from '../src/lib/ai-vercel.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Auth middleware
async function requireAuth(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.replace('Bearer ', '');
    const user = await auth.getUserFromToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, ...additionalData } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    const result = await auth.signUp(email, password, additionalData);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const result = await auth.signIn(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/signout', requireAuth, async (req: any, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    await auth.signOut(token!);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/auth/me', requireAuth, (req: any, res) => {
  res.json({ user: req.user });
});

// Profile routes
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

// Assessment routes
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

// Report routes
app.post('/api/report/generate', requireAuth, async (req: any, res) => {
  try {
    const { assessmentId, responses } = req.body;
    const aiReport = await ai.generateESGReport(responses);
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

// Dashboard route
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
    res.json({ profile, assessments, latestReport, latestAnalytics });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Export for Vercel
export default app;
