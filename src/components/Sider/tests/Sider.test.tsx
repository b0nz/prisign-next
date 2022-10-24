import Sider from '@/components/Sider'
import createStore from '@/stores/store'
import { fireEvent, render, screen } from '@testing-library/react'
import { useEffect } from 'react'

describe('Sider', () => {
  it('should render correctly', async () => {
    render(<Sider />)
    expect(screen.getByText('Welcome to Prisgn')).toBeInTheDocument()
  })
  it('should render correctly, hide banner', async () => {
    const App = () => {
      const { setNotification } = createStore()

      useEffect(() => {
        setNotification({ show: true, message: 'test' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      return (
        <div>
          <Sider />
        </div>
      )
    }
    render(<App />)
    expect(screen.queryByTestId('banner-container')).toHaveStyle(
      'display: inherit',
    )

    await fireEvent.click(screen.getByTestId('banner-btn-close'))
    expect(screen.queryByTestId('banner-container')).toHaveStyle(
      'display: none',
    )
  })
})
