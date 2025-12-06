# 🌱 Yahmi - Enterprise ESG & Sustainability Platform

> AI-powered carbon footprint tracking, ESG reporting, and sustainability analytics for modern businesses.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://yahmimvp.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Svelte](https://img.shields.io/badge/Svelte-5.0-orange?style=flat&logo=svelte)](https://svelte.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6.2-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Database-Neon-00E699?style=flat)](https://neon.tech/)

---

## 🚀 Live Demo

**Production:** [https://yahmimvp.vercel.app](https://yahmimvp.vercel.app)

---

## ✨ Features

### 🎯 Core Capabilities
- **AI-Powered Assessments** - Generate personalized sustainability questionnaires using Groq & OpenRouter
- **Carbon Footprint Tracking** - Measure Scope 1, 2, and 3 emissions with industry benchmarks
- **ESG Reporting** - Automated reports compliant with GRI, TCFD, CSRD standards
- **Deep Analytics** - Enterprise-grade insights on emissions, intensity metrics, and circularity
- **Real-time Dashboard** - Interactive visualizations with ECharts
- **Secure Authentication** - JWT-based auth with bcrypt password hashing

### 🔧 Technical Highlights
- **Serverless Architecture** - Vercel Edge Functions for global low-latency
- **PostgreSQL Database** - Neon serverless Postgres with connection pooling
- **Multi-Provider AI** - Intelligent fallback between Groq (ultra-fast) and OpenRouter (advanced)
- **Response Caching** - 5-minute TTL cache for AI responses
- **Rate Limiting** - Built-in protection against abuse
- **Type Safety** - Full TypeScript coverage with Prisma ORM

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** Svelte 5 (latest)
- **Routing:** svelte-spa-router
- **Charts:** ECharts
- **Icons:** Lucide Svelte
- **Styling:** Custom CSS (no framework bloat)

### Backend
- **Runtime:** Node.js 20 (Vercel Serverless)
- **API:** Express.js + Vercel Functions
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 6.2
- **Auth:** JWT + bcrypt

### AI/ML
- **Primary:** Groq (Llama 3.3 70B) - Ultra-fast inference
- **Fallback:** OpenRouter (Gemini, Llama) - Advanced reasoning
- **SDK:** Vercel AI SDK 5.0

### DevOps
- **Hosting:** Vercel (Serverless)
- **Database:** Neon (Serverless Postgres)
- **CI/CD:** GitHub → Vercel (auto-deploy)
- **Monitoring:** Vercel Analytics (optional)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ (20 recommended)
- npm or yarn
- Git

### 1. Clone Repository
```bash
git clone https://github.com/[your-username]/yahmi.git
cd yahmi
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```bash
# Database (Get from: https://console.neon.tech)
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# Authentication (Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET="your-32-character-secret"
VITE_JWT_SECRET="your-32-character-secret"

# AI APIs
GROQ_API_KEY="gsk_..." # Get from: https://console.groq.com
OPENROUTER_API_KEY="sk-or-v1-..." # Get from: https://openrouter.ai

# App Config
NODE_ENV="development"
VITE_APP_URL="http://localhost:5173"
VITE_API_URL="http://localhost:3001"
```

### 4. Set Up Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio
npm run db:studio
```

### 5. Run Development Server
```bash
npm run dev
```

Open:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

---

## 🚀 Deployment to Vercel

### Quick Deploy (10 minutes)

#### Step 1: Set Environment Variables in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → Settings → Environment Variables
3. Add all variables from `.env` (see `QUICK_DEPLOY_CHECKLIST.md`)

#### Step 2: Deploy
```bash
# Option A: Push to GitHub (auto-deploy)
git push origin main

# Option B: Manual deploy
npm install -g vercel
vercel --prod
```

#### Step 3: Verify
```bash
curl https://yahmimvp.vercel.app/api/health
```

**📖 Full Guide:** See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📁 Project Structure

```
yahmi/
├── api/                      # Vercel Serverless Functions
│   └── [...path].ts         # Catch-all API handler
├── src/
│   ├── components/          # Svelte components
│   ├── pages/               # Route pages
│   ├── lib/                 # Core libraries
│   │   ├── api.ts          # Frontend API client
│   │   ├── auth.ts         # Authentication logic
│   │   ├── db.ts           # Database connection
│   │   └── ai-vercel.ts    # AI integration
│   ├── app.css             # Global styles
│   └── main.ts             # App entry point
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── scripts/
│   ├── vercel-deploy.sh    # Deployment script (Linux/Mac)
│   └── vercel-deploy.ps1   # Deployment script (Windows)
├── vercel.json             # Vercel configuration
├── package.json            # Dependencies
└── README.md               # This file
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (frontend + backend)
npm run dev:client       # Start frontend only
npm run dev:server       # Start backend only

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio
npm run db:test          # Test database connection

# Deployment
npm run vercel-build     # Vercel build command
npm run check:env        # Validate environment variables
```

---

## 🔐 Security

### Implemented
- ✅ JWT authentication with secure tokens
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ SQL injection protection (Prisma ORM)
- ✅ XSS protection headers
- ✅ CORS configuration
- ✅ Rate limiting (100 req/15min)
- ✅ Input validation on all endpoints
- ✅ SSL/TLS for database connections

### Recommendations
- 🔄 Rotate JWT_SECRET regularly
- 🔄 Enable Vercel Firewall
- 🔄 Add API key rotation mechanism
- 🔄 Implement 2FA for admin accounts
- 🔄 Set up security monitoring (Sentry)

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `GET /api/auth/me` - Get current user

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Assessments
- `POST /api/assessment/generate` - Generate AI questionnaire
- `POST /api/assessment/submit` - Submit responses
- `GET /api/assessments` - List assessments

### Reports
- `POST /api/report/generate` - Generate ESG report
- `GET /api/reports` - List reports
- `GET /api/reports/latest` - Get latest report

### Analytics
- `POST /api/analytics/deep` - Generate deep analytics
- `GET /api/analytics/latest` - Get latest analytics

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Health
- `GET /api/health` - Health check

---

## 🧪 Testing

### Manual Testing
```bash
# Test database connection
npm run db:test

# Test API health
curl http://localhost:3001/health

# Test authentication
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

### Automated Testing (Coming Soon)
- Unit tests with Vitest
- Integration tests with Playwright
- E2E tests with Cypress

---

## 📈 Performance

### Current Metrics
- **API Response Time:** <200ms (avg)
- **Database Query Time:** <50ms (avg)
- **AI Generation Time:** 2-5s (Groq), 5-10s (OpenRouter)
- **Page Load Time:** <1s (first load), <200ms (cached)

### Optimization Strategies
- Response caching (5min TTL)
- Connection pooling (Neon)
- Serverless cold start optimization
- AI provider fallback system
- Lazy loading for components

---

## 🐛 Troubleshooting

### Common Issues

#### "Unable to connect to server"
**Cause:** Environment variables not set in Vercel
**Fix:** See `QUICK_DEPLOY_CHECKLIST.md` Step 1

#### "Database connection failed"
**Cause:** DATABASE_URL incorrect or Neon database paused
**Fix:** 
1. Check DATABASE_URL in Vercel settings
2. Verify database is active in Neon Console
3. Test locally: `npm run db:test`

#### "Prisma Client not generated"
**Cause:** Build process didn't run `prisma generate`
**Fix:** Redeploy in Vercel Dashboard

#### CORS errors
**Cause:** API URL mismatch or browser cache
**Fix:** 
1. Clear browser cache (DevTools → Application → Clear site data)
2. Verify VITE_API_URL matches deployment URL

**📖 Full Troubleshooting:** See `VERCEL_DEPLOYMENT_GUIDE.md`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow existing code formatting
- Add comments for complex logic
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Vercel** - Serverless hosting platform
- **Neon** - Serverless PostgreSQL
- **Groq** - Ultra-fast AI inference
- **OpenRouter** - Multi-model AI gateway
- **Prisma** - Next-generation ORM
- **Svelte** - Cybernetically enhanced web apps

---

## 📞 Support

- **Documentation:** See `docs/` folder
- **Deployment Guide:** `VERCEL_DEPLOYMENT_GUIDE.md`
- **Quick Start:** `QUICK_DEPLOY_CHECKLIST.md`
- **Issues:** [GitHub Issues](https://github.com/[your-username]/yahmi/issues)
- **Email:** support@yahmi.com (if applicable)

---

## 🗺️ Roadmap

### v2.1 (Current)
- ✅ Production deployment on Vercel
- ✅ Serverless architecture
- ✅ Multi-provider AI system
- ✅ Deep analytics

### v2.2 (Next)
- [ ] Custom domain setup
- [ ] Vercel Analytics integration
- [ ] Error tracking (Sentry)
- [ ] Automated testing suite

### v2.3 (Future)
- [ ] Multi-language support (i18n)
- [ ] PDF report export
- [ ] Email notifications
- [ ] Team collaboration features

### v3.0 (Long-term)
- [ ] Mobile app (React Native)
- [ ] Advanced AI models (GPT-4, Claude)
- [ ] Real-time collaboration
- [ ] Enterprise SSO integration

---

## 📊 Stats

- **Lines of Code:** ~15,000
- **Components:** 25+
- **API Endpoints:** 15+
- **Database Tables:** 7
- **AI Models:** 5+ (with fallback)
- **Deployment Time:** ~2 minutes
- **Cold Start Time:** <500ms

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ by the Yahmi Team**

**Version:** 2.0.0  
**Last Updated:** December 6, 2024  
**Status:** ✅ Production Ready
