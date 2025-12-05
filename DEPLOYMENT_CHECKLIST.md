# Yahmi Production Deployment Checklist

## ✅ Pre-Deployment Fixes Applied

### 1. **Fixed Missing Dependencies**
- ✅ Moved `@vercel/node` from devDependencies to dependencies
- ✅ All TypeScript types now properly resolved

### 2. **Fixed API Connection Issues**
- ✅ Updated `src/lib/api.ts` to use correct API base URL
  - Production: Same domain (empty string) - routes start with `/api`
  - Development: `http://localhost:3001`
- ✅ Removed unnecessary `api/index.ts` file
- ✅ Using catch-all route `api/[...path].ts` for all API endpoints

### 3. **Fixed Environment Variables**
- ✅ Added both `JWT_SECRET` and `VITE_JWT_SECRET` to `.env`
- ✅ Updated `.env` with production URL: `https://yahmimvp.vercel.app`
- ✅ Set `NODE_ENV="production"`

### 4. **Fixed CORS Configuration**
- ✅ Added `https://yahmimvp.vercel.app` to allowed origins in `server/index.ts`
- ✅ API handler in `api/[...path].ts` has proper CORS headers

### 5. **Fixed TypeScript Errors**
- ✅ Fixed Prisma JSON type issues with `aiReport` and `deepReport`
- ✅ Added proper type casting: `aiReport as any`

---

## 🚀 Vercel Deployment Steps

### Step 1: Set Environment Variables in Vercel Dashboard

Go to your Vercel project settings → Environment Variables and add:

```bash
# Database (Get from Neon Dashboard)
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require

# Authentication (Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-32-character-secret-key-here
VITE_JWT_SECRET=your-32-character-secret-key-here

# AI APIs (Get from respective dashboards)
GROQ_API_KEY=gsk_your_groq_api_key_here
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_api_key_here

# App Configuration
VITE_APP_URL=https://yahmimvp.vercel.app
VITE_API_URL=https://yahmimvp.vercel.app
NODE_ENV=production
```

**⚠️ IMPORTANT:** Copy the actual values from your `.env` file. Do NOT commit real API keys to GitHub!

**IMPORTANT:** Set these for all environments (Production, Preview, Development)

### Step 2: Run Database Migrations

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Push schema to database (if not already done)
npx prisma db push
```

### Step 3: Test Locally Before Deploying

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

### Step 4: Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

Or push to GitHub and let Vercel auto-deploy.

---

## 🔍 Post-Deployment Verification

### 1. Check API Health
Visit: `https://yahmimvp.vercel.app/api/health`

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-12-06T...",
  "environment": "production",
  "database": {
    "healthy": true,
    "message": "Database connection healthy"
  }
}
```

### 2. Test Authentication Flow
1. Go to `https://yahmimvp.vercel.app/auth`
2. Try signing up with a test account
3. Check browser console for any errors
4. Verify you're redirected to dashboard

### 3. Check Browser Console
- Open DevTools → Console
- Look for any CORS errors
- Look for any 404 errors on API calls
- Verify API calls go to `/api/*` not `http://localhost:3001`

### 4. Test Database Connection
- Sign up creates a user in Neon DB
- Check Neon dashboard to verify user was created

---

## 🐛 Common Issues & Solutions

### Issue 1: "Unable to connect to server"
**Cause:** Frontend trying to connect to localhost instead of Vercel API
**Solution:** 
- Verify `VITE_API_URL` is set in Vercel environment variables
- Rebuild and redeploy

### Issue 2: CORS Errors
**Cause:** API not allowing requests from your domain
**Solution:**
- Check `server/index.ts` has `https://yahmimvp.vercel.app` in allowed origins
- Check `api/[...path].ts` has proper CORS headers
- Redeploy

### Issue 3: 500 Internal Server Error
**Cause:** Missing environment variables or database connection issues
**Solution:**
- Check Vercel logs: `vercel logs`
- Verify all environment variables are set
- Test database connection from Neon dashboard

### Issue 4: Prisma Client Not Generated
**Cause:** Build process didn't run `prisma generate`
**Solution:**
- Check `vercel.json` has correct `installCommand`
- Manually run: `vercel env pull && npx prisma generate && vercel --prod`

### Issue 5: JWT Token Invalid
**Cause:** Different JWT_SECRET between environments
**Solution:**
- Ensure `JWT_SECRET` is the same in all Vercel environments
- Clear localStorage and try signing in again

---

## 📊 Monitoring & Logs

### View Deployment Logs
```bash
vercel logs yahmimvp --follow
```

### View Function Logs
Go to Vercel Dashboard → Your Project → Functions → Select a function → View logs

### Database Monitoring
- Neon Dashboard: https://console.neon.tech
- Check connection count, query performance

---

## 🔐 Security Checklist

- ✅ JWT_SECRET is strong (32+ characters)
- ✅ Database uses SSL (`sslmode=require`)
- ✅ CORS only allows specific origins
- ✅ API keys not exposed in frontend code
- ✅ Environment variables set in Vercel (not in code)
- ✅ Rate limiting enabled in API
- ✅ Security headers set (X-Frame-Options, etc.)

---

## 📝 Next Steps After Deployment

1. **Test all features:**
   - Sign up / Sign in
   - Generate assessment
   - Submit assessment
   - Generate report
   - View dashboard

2. **Monitor performance:**
   - Check Vercel Analytics
   - Monitor API response times
   - Check database query performance

3. **Set up alerts:**
   - Vercel deployment notifications
   - Error tracking (consider Sentry)
   - Uptime monitoring

4. **Optimize:**
   - Enable Vercel Edge Caching
   - Optimize database queries
   - Add Redis for session storage (optional)

---

## 🆘 Need Help?

If you encounter issues:

1. Check Vercel logs: `vercel logs`
2. Check browser console for frontend errors
3. Test API endpoints directly with curl or Postman
4. Verify environment variables are set correctly
5. Check Neon database is accessible

**Common Commands:**
```bash
# Pull environment variables locally
vercel env pull

# Check deployment status
vercel ls

# Rollback to previous deployment
vercel rollback

# View project info
vercel inspect
```
