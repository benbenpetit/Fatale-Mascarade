import { FC } from 'react'
import styles from './TopBar.module.scss'
import clsx from 'clsx'
import BubbleCTA from '@/components/UI/BubbleCTA/BubbleCTA'
import FolderIconImg from '@/assets/img/icons/folder.svg'
import { getAvatarImgSrc } from '@/core/utils/img'
import { IPlayer } from '@/core/types/Game'

interface Props {
  currentPlayer?: IPlayer
  currentRound: number
  isItemsButton?: boolean
  onFoundCluesClick?: () => void
  onProfileClick: () => void
}

const TopBar: FC<Props> = ({
  currentPlayer,
  currentRound,
  isItemsButton,
  onFoundCluesClick,
  onProfileClick,
}) => {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.group, styles.left)}>
        <div className={styles.roundNumberCounter}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={clsx(
                styles.circle,
                index < currentRound && styles.isActive
              )}
            >
              <svg width="13" height="19" viewBox="0 0 13 19">
                <path
                  d="M6.5 -3.8147e-06L6.45879 2.93749C6.4088 6.50089 3.56214 9.39326 0 9.5C3.56214 9.60674 6.4088 12.4991 6.45879 16.0625L6.5 19L6.54121 16.0625C6.5912 12.4991 9.43786 9.60674 13 9.5C9.43786 9.39326 6.5912 6.50088 6.54121 2.93749L6.5 -3.8147e-06Z"
                  fill="#A7C5DB"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
      <div className={clsx(styles.group, styles.right)}>
        {isItemsButton && (
          <BubbleCTA
            onClick={onFoundCluesClick}
            text="Indices trouvés"
            iconSrc={FolderIconImg}
          />
        )}
        <BubbleCTA
          onClick={onProfileClick}
          text={currentPlayer?.character?.name ?? 'Ludivine'}
          iconSrc={getAvatarImgSrc(currentPlayer?.character?.id ?? 'ludivine')}
        />
      </div>
    </div>
  )
}

export default TopBar
