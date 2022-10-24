import Input from '@/components/Input'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Input', () => {
  it('should render correctly', async () => {
    render(<Input data-testid="input" />)
    await fireEvent.change(screen.getByTestId('input'), {
      target: { value: 'test123' },
    })
    expect((screen.getByTestId('input') as HTMLInputElement).value).toBe(
      'test123',
    )
    expect(screen.queryByTestId('input-error-message')).not.toBeInTheDocument()
  })

  it('should render correctly, with error message', async () => {
    render(<Input data-testid="input" errorMessage="Error" />)
    expect(screen.getByTestId('input-error-message')).toBeInTheDocument()
    expect(screen.getByTestId('input-error-message').textContent).toEqual(
      'Error',
    )
  })

  it('should render correctly, with label', async () => {
    render(<Input data-testid="input" label="Username" />)
    expect(screen.getByTestId('input-label')).toBeInTheDocument()
    expect(screen.getByTestId('input-label').textContent).toEqual('Username')
  })

  it('should render correctly, with type=password', async () => {
    await render(<Input data-testid="input" type="password" />)
    expect(screen.getByTestId('btn-show-hide-password')).toBeInTheDocument()

    await fireEvent.click(screen.getByTestId('btn-show-hide-password'))
    expect(screen.queryByTestId('show-password-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('hide-password-icon')).not.toBeInTheDocument()

    await fireEvent.click(screen.getByTestId('btn-show-hide-password'))

    expect(screen.queryByTestId('hide-password-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('show-password-icon')).not.toBeInTheDocument()
  })

  it('should render correctly, with type=password & errorMessage', async () => {
    await render(
      <Input
        data-testid="input"
        type="password"
        errorMessage="Password is required!"
      />,
    )
    expect(screen.getByTestId('btn-show-hide-password')).toBeInTheDocument()

    await fireEvent.click(screen.getByTestId('btn-show-hide-password'))
    expect(screen.queryByTestId('show-password-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('hide-password-icon')).not.toBeInTheDocument()

    await fireEvent.click(screen.getByTestId('btn-show-hide-password'))

    expect(screen.queryByTestId('hide-password-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('show-password-icon')).not.toBeInTheDocument()

    expect(screen.queryByTestId('input-error-message')).toBeInTheDocument()
    expect(screen.getByTestId('input-error-message').textContent).toEqual(
      'Password is required!',
    )
  })

  it('should render correctly, with className', async () => {
    render(<Input data-testid="input" className="bg-privblack-0" />)
    expect(screen.getByTestId('input')).toHaveClass('bg-privblack-0')
  })
})
