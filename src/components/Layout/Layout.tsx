import Sider from '@/components/Sider'
import { FC, HTMLAttributes } from 'react'

const Layout: FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
  return (
    <div className="md:flex">
      <Sider />
      <div
        data-testid="layout-content"
        className="w-full min-h-screen bg-privblack-100"
      >
        {children}
      </div>
    </div>
  )
}

export default Layout
