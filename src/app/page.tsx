import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to LeoGPT
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          An intelligent, multimodal AI chatbot application
        </p>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-6">
            Experience next-generation AI conversation with streaming responses and smart model routing
          </p>
          <Button asChild size="lg">
            <Link href="/chat">Start Chatting</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}