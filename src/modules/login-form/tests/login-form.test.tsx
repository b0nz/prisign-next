import LoginForm from '@/modules/login-form'
import { fireEvent, render, screen } from '@testing-library/react'

describe('LoginForm', () => {
  it('should handle input', async () => {
    render(<LoginForm />)
    await fireEvent.keyPress(screen.getByTestId('phone'), {
      key: 'A',
      code: 'KeyA',
      charCode: 65,
    })
    await fireEvent.keyPress(screen.getByTestId('phone'), {
      key: '1',
      code: 'Digit1',
      charCode: 49,
    })
    console.log(screen.getByTestId('phone').nodeValue)
    // expect(screen.getByTestId('phone')).toHaveDisplayValue('1')
  })
})
