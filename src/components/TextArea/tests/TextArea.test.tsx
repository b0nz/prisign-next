import TextArea from '@/components/TextArea'
import { fireEvent, render, screen } from '@testing-library/react'

describe('TextArea', () => {
  it('should render correctly', async () => {
    render(<TextArea data-testid="textarea" />)
    await fireEvent.change(screen.getByTestId('textarea'), {
      target: { value: 'test123' },
    })
    expect((screen.getByTestId('textarea') as HTMLTextAreaElement).value).toBe(
      'test123',
    )
    expect(
      screen.queryByTestId('textarea-error-message'),
    ).not.toBeInTheDocument()
  })

  it('should render correctly, with error message', async () => {
    render(<TextArea data-testid="textarea" errorMessage="Error" />)
    expect(screen.getByTestId('textarea-error-message')).toBeInTheDocument()
    expect(screen.getByTestId('textarea-error-message').textContent).toEqual(
      'Error',
    )
  })

  it('should render correctly, with label', async () => {
    render(<TextArea data-testid="textarea" label="Bio" />)
    expect(screen.getByTestId('textarea-label')).toBeInTheDocument()
    expect(screen.getByTestId('textarea-label').textContent).toEqual('Bio')
  })

  it('should render correctly, with className', async () => {
    render(<TextArea data-testid="textarea" className="bg-privblack-0" />)
    expect(screen.getByTestId('textarea')).toHaveClass('bg-privblack-0')
  })
})
