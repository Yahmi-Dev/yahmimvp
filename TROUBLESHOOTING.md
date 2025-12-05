# Troubleshooting Guide

## Common Issues and Solutions

### 1. "Failed to fetch" Error

**Symptoms:**
- Login/signup fails with "Failed to fetch"
- API requests return network errors
- Console shows CORS errors

**Solutions:**

#### A. Check if server is running
```bash
# Terminal 1: Start the API server
npm run dev:server

# Terminal 2: Start the frontend
npm run dev:client
```

#### B. Verify server is accessible
```bash
# Test health endpoint
curl http://localhost:3001/health

# Should return: {"status":"ok",...}
```

#### C. Check CORS configuration
- Frontend URL: `http://localhost:5173`
- API URL: `http://localhost:3001`
- Make sure VITE_API_URL in .env matches your setup

#### D. Clear browser cache
- Open DevTools (F12)
- Right-click refresh button → "Empty Cache and Hard Reload"

### 2. Database Connection Errors

**Symptoms:**
- "Can't reach database server"
- "Connection refused"
- "SSL connection error"

**Solutions:**

#### A. Verify DATABASE_URL
```bash
# Check your .env file
cat .env | grep DATABASE_URL

# Should look like:
# DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

#### B. Test database connection
```bash
npm run db:test
```

#### C. Check Neon database status
1. Go to https://neon.tech
2. Check if your database is active
3. Verify connection string is correct
4. Ensure SSL mode is enabled

#### D. Regenerate Prisma client
```bash
npm run db:generate
npm run db:push
```

### 3. Authentication Errors

**Symptoms:**
- "Invalid credentials" even with correct password
- "Unauthorized" errors
- Token not persisting

**Solutions:**

#### A. Check JWT_SECRET
```bash
# Verify JWT_SECRET is set
node scripts/check-env.js
```

#### B. Clear localStorage
```javascript
// In browser console:
localStorage.clear();
// Then refresh and try again
```

#### C. Check token in localStorage
```javascript
// In browser console:
console.log(localStorage.getItem('yahmi_token'));
```

#### D. Verify password requirements
- Minimum 8 characters
- No special requirements (for now)

### 4. Environment Variable Issues

**Symptoms:**
- "Missing required environment variables"
- Server won't start
- Undefined values in code

**Solutions:**

#### A. Run environment check
```bash
npm run check:env
```

#### B. Copy .env.example
```bash
cp .env.example .env
# Then edit .env with your values
```

#### C. Verify .env is loaded
```bash
# In server code, add:
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
```

#### D. Restart server after .env changes
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev:server
```

### 5. Prisma/Database Schema Issues

**Symptoms:**
- "Unknown field" errors
- "Table does not exist"
- Migration errors

**Solutions:**

#### A. Reset database (CAUTION: Deletes all data)
```bash
npx prisma migrate reset
npm run db:push
```

#### B. Generate Prisma client
```bash
npm run db:generate
```

#### C. Check schema sync
```bash
npx prisma db pull  # Pull schema from database
npx prisma db push  # Push schema to database
```

#### D. View database in Prisma Studio
```bash
npm run db:studio
# Opens at http://localhost:5555
```

### 6. Build/Deployment Errors

**Symptoms:**
- Build fails
- "Module not found" errors
- TypeScript errors

**Solutions:**

#### A. Clean install
```bash
rm -rf node_modules package-lock.json
npm install
```

#### B. Check TypeScript
```bash
npm run check
```

#### C. Test build locally
```bash
npm run build
npm run preview
```

#### D. Check Vercel logs
```bash
vercel logs
```

### 7. CORS Errors in Production

**Symptoms:**
- Works locally but fails in production
- "Access-Control-Allow-Origin" errors

**Solutions:**

#### A. Update VITE_API_URL in Vercel
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Set VITE_API_URL to your production domain

#### B. Check CORS configuration in server/index.ts
```typescript
// Should include your production domain
const allowedOrigins = [
  'https://your-domain.vercel.app',
  'https://yahmi.vercel.app'
];
```

### 8. API Rate Limiting

**Symptoms:**
- "Too many requests" error
- 429 status code

**Solutions:**

#### A. Wait for rate limit to reset
- Default: 15 minutes

#### B. Adjust rate limits (development only)
```typescript
// In server/index.ts
rateLimit(1000, 60 * 60 * 1000) // 1000 requests per hour
```

### 9. AI API Errors

**Symptoms:**
- Assessment generation fails
- "API key invalid" errors

**Solutions:**

#### A. Verify API keys
```bash
# Check if keys are set
node scripts/check-env.js
```

#### B. Test API keys
```bash
# Test Groq
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer $GROQ_API_KEY"

# Test OpenRouter
curl https://openrouter.ai/api/v1/models \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

#### C. Check API quotas
- Groq: https://console.groq.com
- OpenRouter: https://openrouter.ai/activity

### 10. Performance Issues

**Symptoms:**
- Slow page loads
- Slow API responses
- High memory usage

**Solutions:**

#### A. Check database queries
```bash
# Enable query logging
# In src/lib/db.ts, set log: ['query']
```

#### B. Monitor server resources
```bash
# Check memory usage
node --max-old-space-size=4096 server/index.ts
```

#### C. Optimize database
- Add indexes to frequently queried fields
- Use connection pooling
- Enable query caching

## Quick Diagnostic Commands

```bash
# 1. Check environment
npm run check:env

# 2. Test database
npm run db:test

# 3. Check server health
curl http://localhost:3001/health

# 4. View database
npm run db:studio

# 5. Check TypeScript
npm run check

# 6. Test build
npm run build

# 7. View logs (production)
vercel logs
```

## Getting Help

If you're still experiencing issues:

1. **Check the logs**
   - Browser console (F12)
   - Server terminal output
   - Vercel logs (production)

2. **Gather information**
   - Error message
   - Steps to reproduce
   - Environment (dev/prod)
   - Browser/OS version

3. **Search existing issues**
   - GitHub Issues
   - Stack Overflow
   - Vercel Community

4. **Create a new issue**
   - Include error messages
   - Include relevant code
   - Include environment details

## Useful Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Svelte Documentation](https://svelte.dev/docs)
- [Express Documentation](https://expressjs.com)

---

**Last Updated**: January 2025
