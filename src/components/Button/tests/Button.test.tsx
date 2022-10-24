import { render, screen } from '@testing-library/react'
import Button from '@/components/Button'

describe('Button', () => {
  it('should render button correctly', async () => {
    render(<Button data-testid="btn">Button</Button>)
    await screen.findAllByText('Button')
    expect(screen.getByTestId('btn')).toHaveClass('btn btn-md btn-primary')
  })

  it('should render button correctly, with className=font-bold', async () => {
    render(
      <Button data-testid="btn" className="font-bold">
        Button
      </Button>,
    )
    await screen.findAllByText('Button')
    expect(screen.getByTestId('btn')).toHaveClass(
      'btn btn-md btn-primary font-bold',
    )
  })

  it('should render button correctly, with block=true', async () => {
    render(
      <Button data-testid="btn" block>
        Button
      </Button>,
    )
    expect(screen.getByTestId('btn')).toHaveClass(
      'btn btn-md btn-primary w-full',
    )
  })

  it('should render button correctly, with loading=true', async () => {
    render(
      <Button data-testid="btn" loading>
        Button
      </Button>,
    )
    expect(screen.queryByText('Button')).not.toBeInTheDocument()
    expect(screen.getByTestId('loading')).toHaveClass('animate-spin')
  })

  it('should render button correctly, with variant=primary', async () => {
    render(
      <Button data-testid="btn" variant="primary">
        Button
      </Button>,
    )
    expect(screen.getByTestId('btn')).toHaveClass('btn btn-md btn-primary')
  })

  it('should render button correctly, with variant=outline', async () => {
    render(
      <Button data-testid="btn" variant="outline">
        Button
      </Button>,
    )
    expect(screen.getByTestId('btn')).toHaveClass('btn btn-md btn-outline')
  })

  it('should render button correctly, with variant=transparent', async () => {
    render(
      <Button data-testid="btn" variant="transparent">
        Button
      </Button>,
    )
    expect(screen.getByTestId('btn')).toHaveClass('btn btn-md btn-transparent')
  })
})
