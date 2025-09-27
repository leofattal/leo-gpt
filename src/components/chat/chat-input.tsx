'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Paperclip, Mic } from 'lucide-react'
import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSendMessage = async () => {
    if (message.trim() && !disabled && !isSubmitting) {
      try {
        setIsSubmitting(true)
        await onSendMessage(message.trim())
        setMessage('')
      } catch (error) {
        console.error('Failed to send message:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {/* File upload button - for future multimodal support */}
      <Button
        variant="ghost"
        size="icon"
        disabled={disabled}
        title="Attach file (coming soon)"
      >
        <Paperclip className="h-4 w-4" />
      </Button>

      {/* Voice input button - for future voice support */}
      <Button
        variant="ghost"
        size="icon"
        disabled={disabled}
        title="Voice input (coming soon)"
      >
        <Mic className="h-4 w-4" />
      </Button>

      {/* Text input */}
      <div className="flex-1 relative">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled || isSubmitting}
          className="pr-12"
        />
      </div>

      {/* Send button */}
      <Button
        onClick={handleSendMessage}
        disabled={disabled || !message.trim() || isSubmitting}
        size="icon"
      >
        {isSubmitting ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}