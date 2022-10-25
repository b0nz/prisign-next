import { fireEvent, render, screen } from '@testing-library/react'
import Banner from '@/components/Banner'

describe('Banner', () => {
  it('should render correctly', async () => {
    render(<Banner data-testid="banner" show />)
    expect(screen.queryByTestId('banner-icon-success')).toBeInTheDocument()
    expect(screen.queryByTestId('banner-icon-info')).not.toBeInTheDocument()
  })
  it('should render correctly, show false', async () => {
    render(<Banner data-testid="banner" />)
    expect(screen.queryByTestId('banner-container')).toHaveStyle(
      'display: none',
    )
  })
  it('should render correctly, with handle close button', async () => {
    const handleClose = jest.fn()
    render(<Banner data-testid="banner" show onClose={handleClose} />)
    await fireEvent.click(screen.getByTestId('banner-btn-close'))
    expect(handleClose).toHaveBeenCalled()
  })
})
