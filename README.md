# WikiMasters

A modern, full-stack wiki and article management platform built with cutting-edge web technologies. Perfect for creating, editing, and sharing articles with beautiful markdown support and user authentication.

**Project Type:** Full-stack learning project from [Frontend Masters](https://frontendmasters.com)

## 🚀 Features

- **User Authentication** - Secure authentication via [Hexclave](https://hexclave.com) (Stack Auth)
- **Article Management** - Create, edit, and view articles with rich markdown support
- **Markdown Editor** - Write articles with real-time markdown previews using `@uiw/react-md-editor`
- **Image Upload** - Upload and store images using Vercel Blob storage
- **Caching** - Redis-powered caching with [Upstash](https://upstash.com) for optimized performance
- **Email Notifications** - Send emails via [Resend](https://resend.com)
- **Analytics** - Track user behavior with Vercel Analytics and Speed Insights
- **Responsive Design** - Mobile-friendly UI built with TailwindCSS and shadcn/ui components
- **Database** - PostgreSQL database hosted on [Neon](https://neon.tech) with Drizzle ORM for type-safe queries

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js](https://nextjs.org) 16.2.7 (App Router)
- **UI Library:** React 19.2.4
- **Styling:** TailwindCSS 4 + shadcn/ui + Radix UI
- **Markdown:** @uiw/react-md-editor
- **Icons:** Lucide React

### Backend & Services

- **Language:** TypeScript 5
- **Database:** PostgreSQL (Neon) with [Drizzle ORM](https://orm.drizzle.team)
- **Caching:** [Upstash](https://upstash.com) Redis
- **Authentication:** [Hexclave](https://hexclave.com) (Stack Auth)
- **Email Service:** [Resend](https://resend.com)
- **File Storage:** Vercel Blob
- **Analytics:** Vercel Analytics & Speed Insights

### Developer Tools

- **Formatting & Linting:** Biome 2.2.0
- **Database Migrations:** Drizzle Kit
- **Build Tool:** Next.js with TypeScript

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Environment variables configured (see `.env.local` setup below)

## 🔧 Getting Started

### 1. Clone & Install Dependencies

```bash
npm install
# or yarn install, pnpm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the project root with the following:

```env
# Neon PostgreSQL
DATABASE_URL=your_neon_database_url

# Hexclave/Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID=your_hexclave_project_id
HEXCLAVE_SECRET_SERVER_KEY=your_hexclave_secret_key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Resend Email
RESEND_API_KEY=your_resend_api_key

# Vercel Blob (for image uploads)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

### 3. Set Up Database

Initialize the database and run migrations:

```bash
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Apply migrations to the database
npm run db:seed      # (Optional) Seed initial data
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📚 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── actions/           # Server actions (API calls from client)
│   │   ├── articles.ts    # Article CRUD operations
│   │   ├── pageviews.ts   # Track article views
│   │   └── upload.ts      # File upload handler
│   ├── handler/           # Hexclave auth handler pages
│   ├── wiki/              # Article pages
│   │   ├── [id]/          # View article
│   │   └── edit/          # Edit articles
│   └── page.tsx           # Home page (article list)
├── components/            # React components
│   ├── wiki-*.tsx         # Wiki-specific components
│   └── ui/                # Reusable UI components
├── db/                    # Database configuration
│   ├── schema.ts          # Drizzle schema definitions
│   ├── authz.ts           # Authorization logic
│   ├── sync-user.ts       # User sync from Hexclave
│   └── index.ts           # Database client
├── cache/                 # Caching utilities
├── email/                 # Email templates & functions
├── lib/                   # Utility functions
└── stack/                 # Hexclave/Stack Auth setup
    ├── client.tsx         # Client-side app config
    └── server.tsx         # Server-side app config
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate database migrations
npm run db:migrate      # Apply migrations
npm run db:seed         # Seed database with sample data

# Code Quality
npm run lint            # Check code with Biome
npm run format          # Format code with Biome
npm run typecheck       # Check TypeScript types
```

## 🔐 Authentication

This project uses **Hexclave** (formerly Stack Auth) for secure user authentication. Key features:

- Sign up / Sign in pages
- User profile management
- Server-side user verification for protected actions
- Automatic user sync to local database
- Session management with secure tokens

User data is synced from Hexclave to the local PostgreSQL database for article authorship tracking.

## 📦 Key Dependencies

| Package                | Purpose                          |
| ---------------------- | -------------------------------- |
| `@hexclave/next`       | Authentication & user management |
| `drizzle-orm`          | Type-safe database ORM           |
| `@upstash/redis`       | Redis client for caching         |
| `resend`               | Email service integration        |
| `@vercel/blob`         | Image storage                    |
| `@uiw/react-md-editor` | Markdown editor component        |
| `tailwindcss`          | Utility-first CSS framework      |
| `lucide-react`         | Icon library                     |

## 🚀 Deployment

Deploy easily to Vercel:

1. Push code to a Git repository (GitHub, GitLab, etc.)
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with a single click

[Vercel Deployment Docs](https://vercel.com/docs/concepts/deployments/overview)

## 📖 Learning Resources

This project is based on the **Frontend Masters** full-stack tutorial. Key topics covered:

- Full-stack architecture with Next.js
- Database design and migrations with Drizzle
- Server actions and API patterns
- Authentication & authorization
- Caching strategies
- Email integration
- File uploads
- Real-time analytics

## 🤝 Contributing

This is a learning project. Feel free to experiment, add features, and improve the codebase!

## 📝 License

MIT License - feel free to use this project as a reference for learning.
