import { FC, useContext, useMemo } from 'react'
import styles from './ChronoBar.module.scss'
import { LobbyContext } from '@/core/contexts/LobbyContext'
import { useSnapshot } from 'valtio'
import BubbleCTA from '@/components/UI/BubbleCTA/BubbleCTA'
import { getAvatarImgSrc } from '@/core/utils/img'
import { IPlayer } from '@/core/types/Game'

interface Props {
  maxTime: number
  onProfileClick: () => void
  currentPlayer?: IPlayer
}

const ChronoBar: FC<Props> = ({ maxTime, onProfileClick, currentPlayer }) => {
  const { store } = useContext(LobbyContext)
  const snapshot = useSnapshot(store)
  const timer = useMemo(() => snapshot.timer, [snapshot.timer])

  const getLeadingZeroTime = (time: number) => (time < 10 ? `0${time}` : time)

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <div className={styles.time}>
          <span>00:{getLeadingZeroTime(maxTime - timer)}</span>
          <span>/</span>
          <span>00:{getLeadingZeroTime(maxTime)}</span>
        </div>
        <div className={styles.bar}>
          <span
            className={styles.inside}
            style={{ transform: `scaleX(${(maxTime - timer) / maxTime})` }}
          />
        </div>
      </div>
      <BubbleCTA
        onClick={onProfileClick}
        text={currentPlayer?.character?.name ?? 'Ludivine'}
        iconSrc={getAvatarImgSrc(currentPlayer?.character?.id ?? 'ludivine')}
      />
    </div>
  )
}

export default ChronoBar
