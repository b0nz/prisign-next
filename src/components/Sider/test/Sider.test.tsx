import Sider from '@/components/Sider'
import { render, screen } from '@testing-library/react'

describe('Sider', () => {
  it('should render correctly', async () => {
    render(<Sider />)
    expect(screen.getByText('Welcome to Prisgn')).toBeInTheDocument()
  })
})
