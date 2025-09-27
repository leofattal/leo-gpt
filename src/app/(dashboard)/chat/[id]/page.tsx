import { ChatInterface } from '@/components/chat/chat-interface'

interface ChatPageProps {
  params: Promise<{ id: string }>
}

export default async function ConversationPage({ params }: ChatPageProps) {
  const { id } = await params

  return <ChatInterface conversationId={id} />
}

export const metadata = {
  title: 'Chat - LeoGPT',
  description: 'Chat with AI using LeoGPT',
}