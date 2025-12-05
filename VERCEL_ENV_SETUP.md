# Vercel Environment Variables Setup

## Required Environment Variables

After pushing to GitHub, configure these in Vercel Dashboard:

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Select your project: `yahmimvp`
- Go to: Settings → Environment Variables

### 2. Add These Variables

| Variable Name | Value | Where to Get It |
|--------------|-------|-----------------|
| `DATABASE_URL` | `postgresql://user:pass@host.neon.tech:5432/db?sslmode=require` | [Neon Dashboard](https://neon.tech) → Connection String |
| `JWT_SECRET` | Generate 32+ char string | Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `GROQ_API_KEY` | `gsk_...` | [Groq Console](https://console.groq.com/keys) |
| `OPENROUTER_API_KEY` | `sk-or-v1-...` | [OpenRouter](https://openrouter.ai/keys) |
| `NODE_ENV` | `production` | Just type: `production` |

### 3. Environment Selection

For each variable, select:
- ✅ Production
- ✅ Preview  
- ✅ Development

### 4. Redeploy

After adding all variables:
1. Go to: Deployments tab
2. Click on latest deployment
3. Click "..." → "Redeploy"
4. Wait for build to complete

## Quick Copy-Paste Template

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy this output and use it as JWT_SECRET in Vercel
```

## Verify Setup

After deployment, test these endpoints:

```bash
# Replace with your Vercel URL
VERCEL_URL="https://your-app.vercel.app"

# 1. Health check
curl $VERCEL_URL/api/health

# Should return: {"status":"ok","timestamp":"..."}

# 2. Try signup (replace with real email/password)
curl -X POST $VERCEL_URL/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'

# Should return: {"user":{...},"token":"..."}
```

## Troubleshooting

### "Missing environment variables"
- Double-check all 5 variables are set in Vercel
- Make sure they're enabled for Production environment
- Redeploy after adding variables

### "Database connection failed"
- Verify DATABASE_URL includes `?sslmode=require`
- Check Neon database is active
- Test connection string locally first

### "Invalid API key"
- Verify GROQ_API_KEY starts with `gsk_`
- Verify OPENROUTER_API_KEY starts with `sk-or-v1-`
- Check keys are active in respective dashboards

## Next Steps

1. ✅ Add all environment variables
2. ✅ Redeploy
3. ✅ Test health endpoint
4. ✅ Test signup/signin
5. ✅ Visit your app and create an account!

Your app will be live at: `https://your-app.vercel.app`

---

**Need Help?** Check the Vercel logs for detailed error messages:
```bash
vercel logs
```
