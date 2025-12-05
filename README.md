# Yahmi - Enterprise Sustainability Platform

AI-powered ESG assessment and reporting platform built with Svelte, Neon PostgreSQL, and Vercel AI SDK.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/yahmi)

## 🚀 Quick Start

### Automated Setup (Recommended)

```bash
# Run the setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# Start development servers
npm run dev
```

### Manual Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Setup Environment**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Configure Database**
```bash
npm run db:generate
npm run db:push
```

4. **Check Environment**
```bash
npm run check:env
```

5. **Run Development Servers**
```bash
# Option 1: Run both servers together
npm run dev

# Option 2: Run separately (recommended for debugging)
# Terminal 1:
npm run dev:server

# Terminal 2:
npm run dev:client
```

Visit http://localhost:5173

### Troubleshooting

If you encounter issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for solutions.

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**
```bash
npm i -g vercel
vercel
```

## 🔒 Security

This application implements enterprise-grade security:

- ✅ JWT authentication with secure token handling
- ✅ Password hashing with bcrypt
- ✅ Rate limiting on all endpoints
- ✅ Input validation and sanitization
- ✅ SQL injection prevention via Prisma ORM
- ✅ XSS protection with security headers
- ✅ CORS configuration for production
- ✅ Environment variable validation
- ✅ Sanitized error messages and logs

See [SECURITY.md](./SECURITY.md) for detailed security information.

## 📋 Environment Variables

Required environment variables:

```env
DATABASE_URL=postgresql://...          # Neon PostgreSQL connection
JWT_SECRET=min-32-chars-random-string  # Secure JWT secret
GROQ_API_KEY=gsk_...                   # Groq AI API key
OPENROUTER_API_KEY=sk-or-v1-...        # OpenRouter API key
NODE_ENV=production                     # Environment
```

See `.env.example` for complete configuration.

**⚠️ Security Warning**: Never commit `.env` files to version control!

## 🛠️ Tech Stack

### Frontend
- **Framework**: Svelte 5 + TypeScript
- **Build Tool**: Vite
- **Routing**: svelte-spa-router
- **Styling**: Scoped CSS with CSS variables

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: Neon PostgreSQL (serverless)
- **ORM**: Prisma
- **AI**: Vercel AI SDK (Groq + OpenRouter)
- **Auth**: JWT + bcrypt

### Infrastructure
- **Hosting**: Vercel (serverless)
- **Database**: Neon (serverless PostgreSQL)
- **CDN**: Vercel Edge Network
- **SSL**: Automatic HTTPS

## ✨ Features

### Core Features
- 🤖 AI-powered sustainability assessments
- 📊 Comprehensive ESG reporting
- 📈 Real-time analytics dashboard
- 🔄 Multi-provider AI with intelligent fallback
- 🔐 Enterprise-grade security
- 📱 Responsive design (mobile, tablet, desktop)

### Dashboard Features
- 📊 Overview with key metrics
- 📋 Assessment management
- 📄 Report generation and viewing
- 📈 Advanced analytics
- ⚙️ User settings and preferences
- 🤖 Yahmi AI assistant (coming soon)

## 📁 Project Structure

```
yahmi/
├── src/
│   ├── components/        # Svelte components
│   │   └── dashboard/     # Dashboard-specific components
│   ├── pages/             # Route pages
│   ├── lib/               # Utilities and services
│   │   ├── api.ts         # API client
│   │   ├── auth.ts        # Authentication
│   │   ├── db.ts          # Database client
│   │   └── env.ts         # Environment validation
│   └── app.css            # Global styles
├── server/
│   └── index.ts           # Express API server
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
└── dist/                  # Build output

```

## 🔧 Available Scripts

```bash
npm run dev              # Run dev servers (frontend + backend)
npm run dev:client       # Run frontend only
npm run dev:server       # Run backend only
npm run build            # Build for production
npm run preview          # Preview production build
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio
npm run check            # Type checking
```

## 🌍 Environment Support

- **Development**: Local development with hot reload
- **Production**: Optimized build for Vercel deployment
- **Preview**: Vercel preview deployments for PRs

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby | $0/month |
| Neon | Free Tier | $0/month |
| Groq | Free Tier | $0/month |
| OpenRouter | Pay-as-you-go | ~$0-5/month |

**Total**: $0-5/month for small to medium usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🆘 Support

- 📖 [Deployment Guide](./DEPLOYMENT.md)
- 🔒 [Security Policy](./SECURITY.md)
- 🐛 [Report Issues](https://github.com/yourusername/yahmi/issues)
- 💬 [Discussions](https://github.com/yourusername/yahmi/discussions)

## 🙏 Acknowledgments

- [Svelte](https://svelte.dev) - Cybernetically enhanced web apps
- [Vercel](https://vercel.com) - Platform for frontend developers
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Prisma](https://prisma.io) - Next-generation ORM
- [Groq](https://groq.com) - Fast AI inference
- [OpenRouter](https://openrouter.ai) - Unified AI API

---

**Built with ❤️ for a sustainable future**
