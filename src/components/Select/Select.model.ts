import { OptionHTMLAttributes, SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  errorMessage?: string
}
export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {}
