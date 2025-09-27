"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/lib/types/chat";
import { Bot, User, Search, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex max-w-4xl gap-3",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar
          className={cn(
            "h-8 w-8",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          <AvatarImage src={isUser ? undefined : "/bot-avatar.png"} />
          <AvatarFallback>
            {isUser ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Message bubble */}
        <Card
          className={cn(
            "shadow-sm",
            isUser
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted bg-muted"
          )}
        >
          <CardContent className="p-3">
            <div className="whitespace-pre-wrap break-words text-sm">
              {message.content}
            </div>
          </CardContent>
        </Card>

        {/* Metadata */}
        <div
          className={cn(
            "flex items-center gap-2 text-xs text-muted-foreground",
            isUser ? "flex-row-reverse" : "flex-row"
          )}
        >
          {/* Timestamp */}
          <span>
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {/* AI Metadata */}
          {isAssistant && message.metadata && (
            <>
              {/* AI Model */}
              {message.metadata.model && (
                <Badge variant="secondary" className="px-1 py-0 text-xs">
                  <Zap className="mr-1 h-2 w-2" />
                  {message.metadata.model}
                </Badge>
              )}

              {/* Search Used */}
              {message.metadata.searchUsed && (
                <Badge variant="outline" className="px-1 py-0 text-xs">
                  <Search className="mr-1 h-2 w-2" />
                  Web Search
                </Badge>
              )}

              {/* Confidence Score */}
              {message.metadata.confidence && (
                <span className="text-xs">
                  {Math.round(message.metadata.confidence * 100)}% confidence
                </span>
              )}
            </>
          )}
        </div>

        {/* Search Sources */}
        {isAssistant &&
          message.metadata?.sources &&
          message.metadata.sources.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-xs text-muted-foreground">Sources:</p>
              {message.metadata.sources.map((source, index) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-600 underline hover:text-blue-800"
                >
                  {index + 1}. {source.title}
                </a>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
