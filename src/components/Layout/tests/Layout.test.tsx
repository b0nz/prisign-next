import Layout from '@/components/Layout'
import { render, screen } from '@testing-library/react'

describe('Layout', () => {
  it('should render correctly', async () => {
    render(
      <Layout>
        <div>test</div>
      </Layout>,
    )
    expect(screen.queryByTestId('layout-content')).toBeInTheDocument()
  })
})
