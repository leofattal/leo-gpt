import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Verify authentication
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // For MVP, return a simple response
    // TODO: Implement actual OpenAI integration
    const userMessage = messages[messages.length - 1];
    const response = `Thank you for your message: "${userMessage.content}". This is a placeholder response from LeoGPT. OpenAI integration will be added once proper API keys are configured.`;

    return new Response(response, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
