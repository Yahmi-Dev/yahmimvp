# 🏗️ Yahmi - System Architecture

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Svelte 5 SPA (https://yahmimvp.vercel.app)             │   │
│  │  - Landing Page                                           │   │
│  │  - Auth Page (Sign In/Up)                                │   │
│  │  - Dashboard (Analytics, Reports)                        │   │
│  │  - Assessment Flow                                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                      VERCEL EDGE NETWORK                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  CDN + Static Assets                                      │   │
│  │  - HTML, CSS, JS bundles                               