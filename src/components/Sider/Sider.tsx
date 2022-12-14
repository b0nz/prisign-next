import Image from 'next/image'
import type { FC } from 'react'
import Banner from '@/components/Banner'
import useBanner from '@/hooks/useBanner'
import createStore from '../../stores/store'

const Sider: FC = () => {
  const { notification, setNotification } = createStore()
  const { banner, hideBanner } = useBanner(notification.show)

  return (
    <div className="w-full max-w-[35rem] bg-privblack-50 text-white min-h-screen hidden md:flex md:justify-center p-24 sm:px-6">
      <div className="max-w-[368px] flex flex-col gap-16">
        <div>
          <Image src="/logo.png" width={204} height={38} alt="prisgn" />
        </div>
        <div className="flex flex-col pl-9 gap-3">
          <h1 className="text-[2rem] font-poppins font-semibold">
            Welcome to Prisgn
          </h1>
          <p className="text-base font-roboto font-light">
            Is a personal data platform, you can update your information about
            yourself, customize your profile and change a lot of things
          </p>
        </div>
        <div className="pl-9 mt-2">
          <Banner
            data-testid="sider-banner"
            message={notification.message}
            type={notification.type}
            show={banner}
            onClose={() => {
              hideBanner()
              setNotification({
                show: false,
                message: '',
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Sider
