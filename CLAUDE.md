# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager

Use `pnpm` instead of npm - this project is configured with pnpm and includes a lockfile.

### Common Commands

- `pnpm run dev` - Start development server on localhost:3000
- `pnpm run build` - Build production bundle
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint on src/ directory
- `pnpm run lint:fix` - Auto-fix ESLint issues
- `pnpm run type-check` - Run TypeScript type checking without emitting
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting without fixing

### Code Quality

Always run these commands before committing:

1. `pnpm run type-check` - Ensure TypeScript types are correct
2. `pnpm run lint` - Check for code style issues
3. `pnpm run format:check` - Verify code formatting

### AI Assistant Tools

- **Gemini CLI**: Use `gemini -y "prompt"` for tedious I/O tasks or when you need a second opinion on code decisions
- **Supabase MCP**: Always use the Supabase MCP tools for database operations instead of direct SQL commands

### Documentation Access

- **Context7 MCP**: Use Context7 MCP tools for API documentation (e.g., Vercel AI SDK v5, Next.js, TypeScript libraries)
- **Magic MCP**: Use Magic MCP tools for UI component documentation (e.g., shadcn/ui components, animations, effects)

## Project Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router and TypeScript strict mode
- **UI**: shadcn/ui components with Tailwind CSS
- **AI Integration**: Vercel AI SDK v5 for streaming responses
- **Backend**: Supabase (auth, database, real-time)
- **Models**: OpenAI GPT-4o, Google Gemini, EXA search API
- **Deployment**: Vercel Edge Runtime

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with Inter font
│   └── page.tsx           # Landing page
├── components/            # React components (to be added)
│   ├── chat/             # Chat interface components
│   ├── auth/             # Authentication components
│   └── ui/               # shadcn/ui components
└── lib/                  # Utilities and services
    ├── hooks/            # Custom React hooks
    ├── services/         # API service layers
    ├── types/            # TypeScript definitions
    │   ├── chat.ts       # Chat & conversation types
    │   └── ai.ts         # AI service interfaces
    └── utils.ts          # Utility functions (cn helper)
```

### TypeScript Configuration

- **Path Aliases**: Use `@/` for `src/` directory
- **Strict Mode**: Enabled for better type safety
- **Absolute Imports**: Configured for components, lib, and app directories

### Key Architecture Decisions

1. **Multimodal AI Routing**: Text queries → GPT-4o, Voice/Image → Gemini
2. **Confidence-Based Search**: Low confidence AI responses trigger EXA search fallback
3. **Streaming Responses**: Real-time AI response streaming using Vercel AI SDK
4. **Type Safety**: Comprehensive TypeScript interfaces for AI services and chat functionality
5. **Component Architecture**: shadcn/ui for consistent, accessible UI components
6. **Database Operations**: Use Supabase MCP tools exclusively for all database interactions

### AI Service Integration Pattern

The application implements intelligent model routing based on input type:

- Text inputs are processed by GPT-4o for natural language understanding
- Voice and image inputs are handled by Google Gemini for multimodal processing
- Confidence scoring determines when to enhance responses with web search
- All responses stream in real-time for optimal user experience

### Data Models

Key interfaces are defined in `src/lib/types/`:

- `Message`: Chat message with metadata (model, confidence, search sources)
- `Conversation`: Chat session with user association
- `AIRequest`/`AIResponse`: AI service communication contracts
- `SearchResult`: Web search result structure for EXA integration

### Styling Approach

- **Tailwind CSS**: Utility-first styling with shadcn/ui design system
- **CSS Variables**: Dynamic theming support with HSL color system
- **Dark Mode**: Class-based dark mode implementation
- **Responsive Design**: Mobile-first approach with container constraints
