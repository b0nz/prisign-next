import { ChangeEvent, FC, useMemo } from 'react'
import { RE_DIGIT } from '@/utils/constants'

interface OtpInputProps {
  valueLength?: number
  value?: string
  onChange?: (value: string) => void
  autoFocus?: boolean
  disabled?: boolean
}

const OtpInput: FC<OtpInputProps> = ({
  valueLength = 4,
  value = '',
  onChange = () => {},
}) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split('')
    const items: Array<string> = []
    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i]
      if (RE_DIGIT.test(char)) {
        items.push(char)
      } else {
        items.push('')
      }
    }
    return items
  }, [value, valueLength])

  const focusToNextInput = (target: HTMLInputElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null

    if (nextElementSibling) {
      nextElementSibling.focus()
    }
  }
  const focusToPreviousInput = (target: HTMLInputElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null

    if (previousElementSibling) {
      previousElementSibling.focus()
    }
  }

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target
    let targetValue = target.value.trim()
    const isTargetValueDigit = RE_DIGIT.test(targetValue)
    if (!isTargetValueDigit && targetValue !== '') {
      return
    }

    targetValue = isTargetValueDigit ? targetValue : ' '

    const targetValueLength = targetValue.length
    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1)

      onChange(newValue)

      if (!isTargetValueDigit) {
        return
      }

      focusToNextInput(target)
    } else if (targetValueLength === valueLength) {
      onChange(targetValue)
      target.blur()
    }
  }

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    const target = e.target as HTMLInputElement
    const targetValue = target.value

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault()
      return focusToNextInput(target)
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault()
      return focusToPreviousInput(target)
    }

    // keep the selection range position
    target.setSelectionRange(0, targetValue.length)

    if (key !== 'Backspace' || target.value !== '') {
      return
    }

    focusToPreviousInput(target)
  }

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e
    target.setSelectionRange(0, target.value.length)
  }

  return (
    <div className="flex flex-row gap-6 otp-form">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  )
}

export default OtpInput
