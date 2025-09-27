import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
  className?: string
}

export function ErrorDisplay({ error, onRetry, className }: ErrorDisplayProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center space-x-4 p-4">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-destructive">{error}</p>
        </div>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        )}
      </CardContent>
    </Card>
  )
}