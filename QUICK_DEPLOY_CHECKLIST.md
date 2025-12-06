# ⚡ Quick Deploy Checklist - Yahmi

## 🚨 CRITICAL: Do This First!

### 1. Set Environment Variables in Vercel (5 minutes)

Go to: **https://vercel.com/[your-project]/settings/environment-variables**

Copy-paste these (set for Production, Preview, Development):

```bash
DATABASE_URL=your_neon_database_url_here
JWT_SECRET=your_jwt_secret_here
VITE_JWT_SECRET=your_jwt_secret_here
GROQ_API_KEY=your_groq_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
NODE_ENV=production
VITE_APP_URL=https://yahmimvp.vercel.app
VITE_API_URL=https://yahmimvp.vercel.app
```

---

## 2. Deploy (2 minutes)

### Option A: Push to GitHub (Automatic)
```bash
git add .
git commit -m "fix: production deployment"
git push origin main
```
Vercel auto-deploys on push ✅

### Option B: Manual Deploy
```bash
npm install -g vercel
vercel --prod
```

---

## 3. Test (2 minutes)

### Test 1: Health Check
```bash
curl https://yahmimvp.vercel.app/api/health
```
✅ Should return: `{"status":"ok",...}`

### Test 2: Sign Up
Go to: **https://yahmimvp.vercel.app/auth**
- Create test account
- Should redirect to dashboard

### Test 3: Check Logs
Go to: **Vercel Dashboard → Deployments → Latest → Functions**
- Click `api/[...path]`
- Should see "Database connected" ✅

---

## 🐛 If Something Breaks

### Error: "Unable to connect to server"
**Fix:** Environment variables not set
1. Go to Vercel → Settings → Environment Variables
2. Add all 8 variables above
3. Deployments → Click "..." → Redeploy

### Error: "Database connection failed"
**Fix:** Check DATABASE_URL
1. Verify it's set in Vercel
2. Check Neon database is active: https://console.neon.tech
3. Test locally: `npm run db:test`

### Error: "Prisma Client not generated"
**Fix:** Rebuild
1. Vercel Dashboard → Settings → General
2. Click "Redeploy"
3. Check build logs for errors

### Error: CORS
**Fix:** Clear cache
1. Open DevTools (F12)
2. Application → Clear site data
3. Refresh page

---

## ✅ Success Indicators

- [ ] Health endpoint returns 200 OK
- [ ] Sign up creates account
- [ ] Sign in works
- [ ] Dashboard loads
- [ ] No errors in Vercel logs
- [ ] No CORS errors in browser console

---

## 📚 Full Documentation

- **Complete Guide:** `VERCEL_DEPLOYMENT_GUIDE.md`
- **Technical Details:** `FIXES_SUMMARY.md`
- **Automated Script:** `scripts/vercel-deploy.ps1` (Windows) or `scripts/vercel-deploy.sh` (Linux/Mac)

---

## 🎯 What Was Fixed

1. ✅ Fixed serverless function imports (`api/[...path].ts`)
2. ✅ Removed duplicate files from `api/` folder
3. ✅ Updated `vercel.json` with correct routing
4. ✅ Optimized database for serverless
5. ✅ Added CORS headers

**Your app is production-ready! 🚀**

---

**Time to Deploy:** ~10 minutes
**Difficulty:** Easy ⭐
**Status:** ✅ Ready to Go
