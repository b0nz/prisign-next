import { FC, useState } from 'react'
import { forwardRef } from 'react'
import Button from '@/components/Button'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import type { InputProps } from './Input.model'
import InputClasses from './Input.module.css'

// eslint-disable-next-line react/display-name
const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label = '', errorMessage, ...props }, ref) => {
    const [show, setShow] = useState(false)
    const classes = [InputClasses.input, InputClasses['input-transparent']]

    if (className) {
      classes.push(className)
    }
    if (type === 'password' || show) {
      classes.push(InputClasses['input-password'])
    }
    if (errorMessage) {
      classes.push(InputClasses['input-error'])
    }

    return (
      <label className="relative">
        {label && (
          <div
            data-testid="input-label"
            className="text-xs font-normal font-poppins mb-2"
          >
            {label}
          </div>
        )}
        <input
          type={type === 'password' ? (show ? 'text' : 'password') : type}
          ref={ref}
          className={classes.join(' ')}
          {...props}
        />
        {type === 'password' && (
          <div
            className={`absolute right-0 top-6 flex items-center bottom-${
              errorMessage ? 5 : 0
            }`}
          >
            <Button
              data-testid="btn-show-hide-password"
              variant="transparent"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <FiEye
                  data-testid="show-password-icon"
                  className={InputClasses.icon}
                />
              ) : (
                <FiEyeOff
                  data-testid="hide-password-icon"
                  className={InputClasses.icon}
                />
              )}
            </Button>
          </div>
        )}
        {errorMessage && (
          <p
            data-testid="input-error-message"
            className={InputClasses['error-message']}
          >
            {errorMessage}
          </p>
        )}
      </label>
    )
  },
)

export default Input
