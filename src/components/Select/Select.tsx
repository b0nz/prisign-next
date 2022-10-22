import { FC, forwardRef } from 'react'
import type { OptionProps, SelectProps } from './Select.model'
import { FaSortDown } from 'react-icons/fa'
import SelectClasses from './Select.module.css'

export const Option: FC<OptionProps> = ({ children, ...props }) => {
  return (
    <option data-testid="select-option" {...props}>
      {children}
    </option>
  )
}

// eslint-disable-next-line react/display-name
const Select: FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, children, errorMessage, ...props }, ref) => {
    const classes = [
      SelectClasses.select,
      SelectClasses['select-transparent'],
      'w-full',
      'appearance-none',
    ]

    if (errorMessage) {
      classes.push(SelectClasses['select-error'])
    }

    return (
      <label className="relative">
        {label && (
          <div
            data-testid="select-label"
            className="text-xs font-normal font-poppins mb-2"
          >
            {label}
          </div>
        )}
        <select ref={ref} className={classes.join(' ')} {...props}>
          {children}
        </select>
        <div
          className={`absolute right-0 top-6 bottom-${
            errorMessage ? 5 : 0
          } flex items-center`}
        >
          <FaSortDown className={SelectClasses.icon} />
        </div>
        {errorMessage && (
          <p
            data-testid="select-error-message"
            className={SelectClasses['error-message']}
          >
            {errorMessage}
          </p>
        )}
      </label>
    )
  },
)

export default Select
