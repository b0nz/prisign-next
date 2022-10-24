import { FC, forwardRef } from 'react'
import { TextAreaProps } from './TextArea.model'
import TextAreaClasses from './TextArea.module.css'

// eslint-disable-next-line react/display-name
const TextArea: FC<TextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ className, errorMessage, label, ...props }, ref) => {
  const classes = [
    TextAreaClasses.textarea,
    TextAreaClasses['textarea-transparent'],
  ]

  if (className) {
    classes.push(className)
  }
  if (errorMessage) {
    classes.push(TextAreaClasses['textarea-error'])
  }

  return (
    <label className="relative">
      {label && (
        <div
          data-testid="textarea-label"
          className="text-xs font-normal font-poppins mb-2"
        >
          {label}
        </div>
      )}
      <textarea ref={ref} className={classes.join(' ')} {...props} />
      {errorMessage && (
        <p
          data-testid="textarea-error-message"
          className={TextAreaClasses['error-message']}
        >
          {errorMessage}
        </p>
      )}
    </label>
  )
})

export default TextArea
