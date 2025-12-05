// Vercel Serverless API Handler
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../src/lib/db.js';
import * as auth from '../src/lib/auth.js';
import * as ai from '../src/lib/ai-vercel.js';

// Helper to parse request body
async function parseBody(req: VercelRequest): Promise<any> {
  if (req.body) return req.body;
  return {};
}

// Auth middleware
async function requireAuth(req: VercelRequest): Promise<{ user: any; error?: string }> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null, error: 'Unauthorized' };
    }
    const token = authHeader.replace('Bearer ', '');
    const user = await auth.getUserFromToken(token);
    if (!user) {
      return { user: null, error: 'Invalid token' };
    }
    return { user };
  } catch (error) {
    return { user: null, error: 'Authentication failed' };
  }
}

// Main handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, url } = req;
  const path = url?.replace('/api', '') || '/';

  try {
    // Health check
    if (path === '/health' && method === 'GET') {
      return res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString() 
      });
    }

    // Auth routes
    if (path === '/auth/signup' && method === 'POST') {
      const body = await parseBody(req);
      const { email, password, ...additionalData } = body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }
      if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
      }
      
      const result = await auth.signUp(email, password, additionalData);
      return res.status(200).json(result);
    }

    if (path === '/auth/signin' && method === 'POST') {
      const body = await parseBody(req);
      const { email, password } = body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }
      
      const result = await auth.signIn(email, password);
      return res.status(200).json(result);
    }

    if (path === '/auth/signout' && method === 'POST') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const token = req.headers.authorization?.replace('Bearer ', '');
      await auth.signOut(token!);
      return res.status(200).json({ success: true });
    }

    if (path === '/auth/me' && method === 'GET') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      return res.status(200).json({ user });
    }

    // Profile routes
    if (path === '/profile' && method === 'GET') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const profile = await auth.getUserProfile(user.id);
      return res.status(200).json(profile);
    }

    if (path === '/profile' && method === 'PUT') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const body = await parseBody(req);
      const updated = await auth.updateUserProfile(user.id, body);
      return res.status(200).json(updated);
    }

    // Assessment routes
    if (path === '/assessment/generate' && method === 'POST') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const body = await parseBody(req);
      const { industry, companySize, company } = body;
      const questions = await ai.generateAssessment({ industry, companySize, company });
      return res.status(200).json({ questions });
    }

    if (path === '/assessment/submit' && method === 'POST') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const body = await parseBody(req);
      const { industry, responses, carbonScore, esgScore } = body;
      
      const assessment = await prisma.assessment.create({
        data: {
          userId: user.id,
          industry,
          responses,
          carbonScore,
          esgScore,
        },
      });
      return res.status(200).json(assessment);
    }

    if (path === '/assessments' && method === 'GET') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const assessments = await prisma.assessment.findMany({
        where: { userId: user.id },
        orderBy: { completedAt: 'desc' },
      });
      return res.status(200).json(assessments);
    }

    // Report routes
    if (path === '/report/generate' && method === 'POST') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const body = await parseBody(req);
      const { assessmentId, responses } = body;
      
      const aiReport = await ai.generateESGReport(responses);
      const report = await prisma.report.create({
        data: {
          userId: user.id,
          assessmentId,
          carbonFootprint: aiReport.score,
          esgScore: aiReport.score,
          aiReport: aiReport as any,
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
      return res.status(200).json(report);
    }

    if (path === '/reports' && method === 'GET') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const reports = await prisma.report.findMany({
        where: { userId: user.id },
        orderBy: { generatedAt: 'desc' },
        include: { assessment: true },
      });
      return res.status(200).json(reports);
    }

    if (path === '/reports/latest' && method === 'GET') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const report = await prisma.report.findFirst({
        where: { userId: user.id },
        orderBy: { generatedAt: 'desc' },
        include: { assessment: true },
      });
      return res.status(200).json(report);
    }

    // Dashboard route
    if (path === '/dashboard' && method === 'GET') {
      const { user, error } = await requireAuth(req);
      if (error) return res.status(401).json({ error });
      
      const [profile, assessments, latestReport, latestAnalytics] = await Promise.all([
        auth.getUserProfile(user.id),
        prisma.assessment.findMany({
          where: { userId: user.id },
          orderBy: { completedAt: 'desc' },
          take: 5,
        }),
        prisma.report.findFirst({
          where: { userId: user.id },
          orderBy: { generatedAt: 'desc' },
        }),
        prisma.deepAnalytics.findFirst({
          where: { userId: user.id },
          orderBy: { generatedAt: 'desc' },
        }),
      ]);
      
      return res.status(200).json({ profile, assessments, latestReport, latestAnalytics });
    }

    // 404
    return res.status(404).json({ error: 'Route not found' });

  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
