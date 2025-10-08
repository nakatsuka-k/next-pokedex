import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
        sizeClasses[size],
        className
      )}
    />
  )
}

interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Loading({ message = '読み込み中...', size = 'md', className }: LoadingProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-8', className)}>
      <LoadingSpinner size={size} />
      <p className="text-gray-600">{message}</p>
    </div>
  )
}

export default Loading
