import { IoClose, IoCheckmarkCircle } from 'react-icons/io5'
import { IoIosInformationCircle } from 'react-icons/io'
import BannerClasses from './Banner.module.css'
import { FC } from 'react'
import { BannerProps } from './Banner.model'

const statusIcon = {
  success: (
    <IoCheckmarkCircle
      data-testid="banner-icon-success"
      className={BannerClasses['banner-icon']}
      size={20}
    />
  ),
  info: (
    <IoIosInformationCircle
      data-testid="banner-icon-info"
      className={BannerClasses['banner-icon']}
      size={20}
    />
  ),
}

const Banner: FC<BannerProps> = ({
  message,
  show = false,
  onClose,
  type = null,
  ...props
}) => {
  const classes = [BannerClasses.banner]

  return (
    <div
      data-testid="banner-container"
      style={{ display: show ? 'inherit' : 'none' }}
    >
      <div className={classes.join(' ')} {...props}>
        <div>{statusIcon[type || 'success']}</div>
        <div
          data-testid="banner-message"
          className="flex-1 font-poppins font-normal text-xs"
        >
          {message}
        </div>
        <div>
          <button
            data-testid="banner-btn-close"
            className="bg-transparent"
            onClick={onClose}
          >
            <IoClose className={BannerClasses['close-icon']} size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
