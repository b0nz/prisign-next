import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name?: string
  placeholder?: string
  className?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  errorMessage?: string
}
