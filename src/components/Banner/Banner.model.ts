import { HTMLAttributes } from 'react'

export interface BannerProps extends HTMLAttributes<HTMLElement> {
  message?: string
  type?: 'success' | 'info' | null
  show?: boolean
  onClose?: () => void
}
