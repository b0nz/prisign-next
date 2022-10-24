import useBanner from '@/hooks/useBanner'
import { fireEvent, render, screen } from '@testing-library/react'

describe('useBanner', () => {
  it('should return value correctly', async () => {
    const App = () => {
      const { banner, showBanner, hideBanner } = useBanner()

      return (
        <div>
          <button data-testid="show-btn" onClick={() => showBanner(true)}>
            Show Banner
          </button>
          <button data-testid="hide-btn" onClick={() => hideBanner()}>
            Hide Banner
          </button>
          <div data-testid="banner">Banner={banner.toString()}</div>
        </div>
      )
    }

    render(<App />)
    expect(screen.getByTestId('banner')).toHaveTextContent('Banner=false')

    await fireEvent.click(screen.getByTestId('show-btn'))
    expect(screen.getByTestId('banner')).toHaveTextContent('Banner=true')

    await fireEvent.click(screen.getByTestId('hide-btn'))
    expect(screen.getByTestId('banner')).toHaveTextContent('Banner=false')
  })
})
