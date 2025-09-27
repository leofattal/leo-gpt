# LeoGPT

An intelligent, multimodal AI chatbot application that provides users with a seamless conversational experience across text, voice, and image inputs.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 + TypeScript + App Router
- **Package Manager**: pnpm
- **UI Framework**: shadcn/ui + Tailwind CSS
- **AI Integration**: Vercel AI SDK v5
- **Backend**: Supabase (Database, Auth, Real-time)
- **Deployment**: Vercel Edge Runtime
- **Development Tools**: ESLint, Prettier, TypeScript strict mode

## 📦 Dependencies

### AI Services
- `ai` - Vercel AI SDK v5
- `@ai-sdk/openai` - OpenAI integration
- `@ai-sdk/google` - Google Gemini integration
- `openai` - OpenAI official SDK

### Database & Auth
- `@supabase/supabase-js` - Supabase client
- `@supabase/ssr` - Server-side rendering support

### UI & Styling
- `tailwindcss` - Utility-first CSS framework
- `shadcn/ui` dependencies:
  - `class-variance-authority`
  - `clsx`
  - `tailwind-merge`
  - `lucide-react`
  - `tailwindcss-animate`

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- pnpm installed globally (`npm install -g pnpm`)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd leo-gpt
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your API keys in `.env.local`:
   - `OPENAI_API_KEY`
   - `GOOGLE_GENERATIVE_AI_API_KEY`
   - `EXA_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Run the development server:
   ```bash
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── chat/             # Chat-related components
│   ├── auth/             # Authentication components
│   └── ui/               # shadcn/ui components
└── lib/                  # Utilities and configurations
    ├── hooks/            # Custom React hooks
    ├── services/         # API services
    ├── types/            # TypeScript type definitions
    └── utils.ts          # Utility functions
```

## 🛠️ Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix ESLint issues
- `pnpm run type-check` - Check TypeScript types
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path aliases configured (`@/` for `src/`)
- Next.js plugin enabled

### Tailwind CSS
- shadcn/ui color system
- Custom animations
- Dark mode support

### ESLint
- Next.js recommended configuration
- TypeScript support

## 🚀 Next Steps

1. **Set up Supabase**:
   - Create a new Supabase project
   - Set up authentication providers
   - Configure database tables per PRD.md

2. **Implement core features**:
   - Chat interface with streaming responses
   - AI model routing (GPT-4o, Gemini)
   - Multimodal input handling
   - EXA search integration

3. **Add shadcn/ui components**:
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add input
   npx shadcn@latest add card
   ```

## 📋 PRD Implementation Status

This project implements the Product Requirements Document (PRD.md). Feature completion:

- ✅ Project setup and tech stack
- ✅ Chat interface with streaming responses
- ✅ OpenAI GPT-4o integration
- ✅ Supabase authentication (Google OAuth)
- ✅ Database schema and persistence
- ✅ Modern UI with shadcn/ui
- ✅ Conversation management
- ✅ User profile settings
- ✅ Mobile-responsive design
- ⏳ Voice input support (future)
- ⏳ Image upload support (future)
- ⏳ EXA search fallback (future)
- ⏳ Gemini multimodal integration (future)

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)