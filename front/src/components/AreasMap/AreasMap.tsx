import { FC, useState } from 'react'
import styles from './AreasMap.module.scss'
import { AreaClass, IPlayer } from '@/core/types/Game'
import clsx from 'clsx'
import CTA from '@/components/UI/CTA/CTA'
import SkullIcon from '@/assets/img/icons/skull.webp'
import BubbleCTA from '@/components/UI/BubbleCTA/BubbleCTA'
import ProfileCharacter from '@/components/ProfileCharacter/ProfileCharacter'
import { getAvatarImgSrc } from '@/core/utils/img'

interface Props {
  areas: AreaClass[]
  players: IPlayer[]
  currentPlayer?: IPlayer
  onAreaClick: (id: string) => void
  isReady?: boolean
  onReadyClick: () => void
}

const AreasMap: FC<Props> = ({
  areas,
  players,
  currentPlayer,
  onAreaClick,
  isReady,
  onReadyClick,
}) => {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false)

  return (
    <div className={styles.container}>
      {isProfileModalVisible && (
        <ProfileCharacter
          currentPlayer={currentPlayer}
          isBad={currentPlayer?.character?.isBad}
          onDismiss={() => setIsProfileModalVisible(false)}
        />
      )}
      <div className={styles.wrapper}>
        <div className={clsx(styles.group, styles.left)}>
          <div className={styles.areas}>
            {areas.map((area) => {
              const playersInRoom = players.filter(
                (player) => player.currentAreaId === area.id
              )

              return (
                <div
                  key={area.id}
                  className={clsx(
                    styles.area,
                    styles[`area-${area.id}`],
                    area.isDeadArea && styles.isDeadArea,
                    currentPlayer?.currentAreaId === area.id && styles.isCurrent
                  )}
                  onClick={() => onAreaClick(area.id)}
                >
                  <span className={styles.door} />
                  {area.isDeadArea && (
                    <div className={styles.deadEmoji}>
                      <img src={SkullIcon} alt="" />
                    </div>
                  )}
                  <span className={styles.title}>{area.title}</span>
                  <div className={styles.roomPlayers}>
                    {playersInRoom.map((player) => (
                      <div key={player.id} className={styles.avatar}>
                        <img
                          src={getAvatarImgSrc(
                            player?.character?.id ?? 'ludivine'
                          )}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={clsx(styles.group, styles.right)}>
          <BubbleCTA
            onClick={() => setIsProfileModalVisible(true)}
            text={currentPlayer?.character?.name ?? 'Ludivine'}
            iconSrc={getAvatarImgSrc(
              currentPlayer?.character?.id ?? 'ludivine'
            )}
          />
          <CTA
            onClick={
              currentPlayer?.currentAreaId !== 'livingroom'
                ? onReadyClick
                : undefined
            }
            text={isReady ? 'Prêt.e' : 'Valider'}
            isHighlight={!isReady}
            disabled={currentPlayer?.currentAreaId === 'livingroom'}
          />
        </div>
      </div>
    </div>
  )
}

export default AreasMap
