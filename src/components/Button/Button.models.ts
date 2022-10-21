import type { HTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: 'primary' | 'outline' | 'transparent'
  block?: boolean
  className?: string
  loading?: boolean
}
