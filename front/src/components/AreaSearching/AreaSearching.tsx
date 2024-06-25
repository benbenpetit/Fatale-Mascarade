import { FC, useLayoutEffect, useRef, useState } from 'react'
import styles from './AreaSearching.module.scss'
import { gsap } from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import InertiaPlugin from 'gsap/dist/InertiaPlugin'
import { AreaClass, IPlayer } from '@/core/types/Game'
import clsx from 'clsx'
import { getAreaImgSrc } from '@/core/utils/img'
import ChronoBar from '@/components/ChronoBar/ChronoBar'
import ProfileCharacter from '@/components/ProfileCharacter/ProfileCharacter'

interface Props {
  area: AreaClass
  currentPlayer?: IPlayer
  onCollectItem: (id: string) => void
  isHandFree: boolean
}

const AreaSearching: FC<Props> = ({
  area,
  currentPlayer,
  onCollectItem,
  isHandFree,
}) => {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false)
  const draggableContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin)

    if (draggableContainerRef.current) {
      Draggable.create(draggableContainerRef.current, {
        type: 'x,y',
        edgeResistance: 1,
        inertia: true,
        bounds: {
          minX: 0,
          minY: 0,
          maxX: window.innerWidth - draggableContainerRef.current.offsetWidth,
          maxY: window.innerHeight - draggableContainerRef.current.offsetHeight,
        },
      })
    }

    return () => {
      Draggable.get(draggableContainerRef.current).kill()
    }
  }, [])

  return (
    <div className={styles.container}>
      {isProfileModalVisible && (
        <ProfileCharacter
          currentPlayer={currentPlayer}
          onDismiss={() => setIsProfileModalVisible(false)}
          isBad={currentPlayer?.character?.isBad}
        />
      )}
      <ChronoBar
        maxTime={20}
        onProfileClick={() => setIsProfileModalVisible(true)}
        currentPlayer={currentPlayer}
      />
      <div className={styles.constraints}>
        <div ref={draggableContainerRef} className={styles.draggableContainer}>
          <picture>
            <source
              srcSet={getAreaImgSrc('search-room', 'avif')}
              type="image/avif"
            />
            <img src={getAreaImgSrc('search-room', 'webp')} alt="" />
          </picture>
          <div className={styles.items}>
            {area.items.map((item) => (
              <button
                key={item.id}
                className={clsx(
                  styles.item,
                  item.isPickedUp && styles.isPickedUp,
                  !item.isPickedUp && !isHandFree && styles.isHandFull
                )}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                }}
                onClick={() => isHandFree && onCollectItem(item.id)}
                onTouchStart={() => isHandFree && onCollectItem(item.id)}
              >
                <svg
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 14.448C13.1281 14.448 14.4479 13.1282 14.4479 11.5002C14.4479 9.87214 13.1281 8.55237 11.5 8.55237C9.87202 8.55237 8.55225 9.87214 8.55225 11.5002C8.55225 13.1282 9.87202 14.448 11.5 14.448Z"
                    fill="black"
                  />
                  <path
                    d="M22.3166 10.6987C21.0979 8.81394 19.5166 7.21291 17.7443 6.06833C15.7835 4.80078 13.6187 4.13062 11.4843 4.13062C9.5259 4.13062 7.60015 4.69024 5.76054 5.79382C3.88454 6.91905 2.18495 8.56291 0.708742 10.6793C0.542092 10.9185 0.450311 11.2019 0.445063 11.4933C0.439814 11.7848 0.521334 12.0713 0.679264 12.3163C1.89569 14.2199 3.46125 15.8233 5.20598 16.9522C7.17042 18.2248 9.28454 18.8696 11.4843 18.8696C13.6358 18.8696 15.8052 18.205 17.7576 16.948C19.5291 15.8071 21.1071 14.2001 22.3212 12.2997C22.4737 12.0604 22.5543 11.7823 22.5535 11.4985C22.5527 11.2147 22.4705 10.9371 22.3166 10.6987ZM11.5 15.9218C10.6255 15.9218 9.77058 15.6625 9.04343 15.1766C8.31629 14.6908 7.74955 14.0002 7.41488 13.1922C7.08021 12.3843 6.99265 11.4952 7.16326 10.6375C7.33387 9.77976 7.755 8.99189 8.37338 8.3735C8.99177 7.75512 9.77964 7.33399 10.6374 7.16338C11.4951 6.99277 12.3842 7.08033 13.1921 7.415C14.0001 7.74967 14.6907 8.31641 15.1765 9.04355C15.6624 9.7707 15.9217 10.6256 15.9217 11.5001C15.9204 12.6724 15.4541 13.7963 14.6251 14.6253C13.7962 15.4542 12.6723 15.9205 11.5 15.9218Z"
                    fill="black"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AreaSearching
