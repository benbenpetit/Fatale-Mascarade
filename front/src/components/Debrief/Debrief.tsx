import { FC, useState } from 'react'
import styles from './Debrief.module.scss'
import { IPlayer } from '@/core/types/Game'
import CollectedItems from '@/components/CollectedItems/CollectedItems'
import CTA from '@/components/UI/CTA/CTA'
import Modal from '@/components/UI/Modal/Modal'
import TopBar from '@/components/TopBar/TopBar'
import ProfileCharacter from '@/components/ProfileCharacter/ProfileCharacter'
import { getAvatarImgSrc } from '@/core/utils/img'

interface Props {
  currentPlayer?: IPlayer
  players: IPlayer[]
  currentRound: number
  onReadyClick: () => void
  onUnlockItem: (id: string) => void
}

const Debrief: FC<Props> = ({
  currentPlayer,
  players,
  currentRound,
  onReadyClick,
  onUnlockItem,
}) => {
  const [isItemsModalVisible, setIsItemsModalVisible] = useState(true)
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false)

  return (
    <div className={styles.container}>
      {isItemsModalVisible && (
        <Modal onDismiss={() => setIsItemsModalVisible(false)}>
          <CollectedItems
            newItems={currentPlayer?.currentRoundItems ?? []}
            items={currentPlayer?.items ?? []}
            onUnlockItem={(id) => onUnlockItem(id)}
          />
        </Modal>
      )}
      {isProfileModalVisible && (
        <ProfileCharacter
          currentPlayer={currentPlayer}
          isBad={currentPlayer?.character?.isBad}
          onDismiss={() => setIsProfileModalVisible(false)}
        />
      )}
      <TopBar
        currentPlayer={currentPlayer}
        currentRound={currentRound}
        isItemsButton
        onFoundCluesClick={() => setIsItemsModalVisible(true)}
        onProfileClick={() => setIsProfileModalVisible(true)}
      />
      <div className={styles.wrapper}>
        <h3>
          <span>Phase de débat</span>
        </h3>
        <p>
          <span>Qui est le ou la meurtrière selon vous ?</span>
          <span>Vous avez le droit de mentir pour vous défendre.</span>
        </p>
        <div className={styles.ctaContainer}>
          <CTA
            onClick={onReadyClick}
            text={
              !currentPlayer?.isReady
                ? 'Prêt.e pour la phase suivante'
                : 'Prêt.e!'
            }
            isHighlight={!currentPlayer?.isReady}
          />
          <div className={styles.avatars}>
            {players
              .filter((player) => player.isReady)
              .map((player) => (
                <div className={styles.avatar} key={player.id}>
                  <img
                    src={getAvatarImgSrc(player?.character?.id ?? 'ludivine')}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Debrief
