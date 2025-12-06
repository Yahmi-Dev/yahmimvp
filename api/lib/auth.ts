// Authentication Utilities - Neon-based
import { prisma } from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Use JWT_SECRET from environment (server-side only)
const JWT_SECRET = process.env.JWT_SECRET || process.env.VITE_JWT_SECRET || 'fallback-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

if (!process.env.JWT_SECRET && !process.env.VITE_JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET not set. Using fallback (insecure for production)');
}

export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  companyName?: string;
  industry?: string;
}

export interface SessionData {
  userId: string;
  email: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate JWT token
export function generateToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): SessionData | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionData;
    return decoded;
  } catch {
    return null;
  }
}

// Sign up user
export async function signUp(email: string, password: string, additionalData?: any) {
  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User already exists');
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      ...additionalData,
    },
  });

  // Generate token
  const token = generateToken(user.id, user.email);

  // Create session
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      companyName: user.companyName,
      industry: user.industry,
    },
    token,
  };
}

// Sign in user
export async function signIn(email: string, password: string) {
  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = generateToken(user.id, user.email);

  // Create session
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      companyName: user.companyName,
      industry: user.industry,
    },
    token,
  };
}

// Get user from token
export async function getUserFromToken(token: string): Promise<AuthUser | null> {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    displayName: session.user.displayName,
    companyName: session.user.companyName,
    industry: session.user.industry,
  };
}

// Sign out
export async function signOut(token: string) {
  await prisma.session.delete({ where: { token } });
}

// Get user profile
export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      displayName: true,
      companyName: true,
      industry: true,
      companySize: true,
      role: true,
      regions: true,
      facilitiesCount: true,
      revenueUSD: true,
      productionUnits: true,
      suppliersCount: true,
      primaryDataShare: true,
      productsCount: true,
      bomAvailable: true,
      internalCarbonPrice: true,
      sbtiCommitted: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

// Update user profile
export async function updateUserProfile(userId: string, data: any) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}
