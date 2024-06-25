import FullscreenButton from '@/components/FullscreenButton/FullscreenButton'
import { FC, ReactNode, useLayoutEffect, useState } from 'react'
import { isIOS, isMobile } from 'react-device-detect'

interface Props {
  children: ReactNode
}

const App: FC<Props> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement)

  useLayoutEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  return (
    <>
      {isMobile && !isIOS && !isFullscreen && <FullscreenButton />}
      {children}
    </>
  )
}

export default App
