import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { ChatHeader } from '@/components/chat/chat-header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:flex">
        <ChatSidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0">
        <ChatHeader />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}