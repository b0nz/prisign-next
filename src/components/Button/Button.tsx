import type { FC } from 'react'
import type { ButtonProps } from './Button.model'
import ButtonStyles from './Button.module.css'
import { CgSpinner } from 'react-icons/cg'

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  block,
  className,
  loading,
  ...props
}) => {
  const classes = [
    ButtonStyles['btn'],
    ButtonStyles['btn-md'],
    ButtonStyles[`btn-${variant}`],
  ]

  if (block) {
    classes.push('w-full')
  }

  if (className) {
    classes.push(className)
  }

  return (
    <button className={classes.join(' ')} {...props}>
      {loading ? (
        <span className="flex justify-center align-middle">
          <CgSpinner data-testid="loading" className="animate-spin" />
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
