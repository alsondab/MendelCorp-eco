import { toast as sonnerToast } from 'sonner'

interface ToastOptions {
  variant?: 'default' | 'destructive'
  description: string
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    if (options.variant === 'destructive') {
      sonnerToast.error(options.description)
    } else {
      sonnerToast.success(options.description)
    }
  }

  return { toast }
}
