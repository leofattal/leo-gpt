export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to LeoGPT
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-8">
          An intelligent, multimodal AI chatbot application
        </p>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Project successfully initialized with Next.js 15, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </main>
  );
}