import { useCallback, useEffect, useState } from 'react'

const useBanner = (initvalue: boolean = false) => {
  const [banner, setBanner] = useState<boolean>(initvalue)

  useEffect(() => {
    setBanner(initvalue)
  }, [initvalue])

  const showBanner = useCallback((banner: boolean) => {
    setBanner(banner)
  }, [])

  const hideBanner = useCallback(() => {
    setBanner(false)
  }, [])

  return { banner, showBanner, hideBanner }
}

export default useBanner
