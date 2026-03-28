# AI Professor

Real-time AI news aggregation meets AI-powered learning. Stay current with the latest AI developments and get smarter with expert-led courses.

## 🌐 Live Site

https://ai-professor-red.vercel.app

## ✨ Features

- **📰 Breaking Tech News** - Real-time updates from 7 top tech sources
- **🤖 AI-Focused Articles** - Curated AI news from OpenAI, Anthropic, TechCrunch, and more
- **📚 Quick Guides** - 24 free hands-on tutorials (30 min each)
- **🎓 Full Courses** - 5 comprehensive programs (8-12 weeks)

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** NextAuth.js
- **AI:** OpenAI API
- **Deployment:** Vercel

## 📦 Installation

```bash
git clone https://github.com/ashdevs999-pixel/ai-professor.git
cd ai-professor
npm install
```

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_SECRET`
- `OPENAI_API_KEY`

## 🚀 Development

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run start   # Start production server
```

## 📅 Scheduled Jobs

The following cron jobs run automatically:
- **News Scraping:** Daily at 6 AM UTC
- **Tools Scraping:** Daily at 9 AM UTC

## 📝 License

MIT

## 👤 Author

Bryan Leong

---

© 2026 Pulse + AI Professor. Stay current. Get smarter.
