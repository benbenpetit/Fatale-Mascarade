import { FC, useState } from 'react'
import styles from './ActionPhase.module.scss'
import { IPlayer, ItemClass } from '@/core/types/Game'
import CTA from '@/components/UI/CTA/CTA'
import Modal from '@/components/UI/Modal/Modal'
import CodeScanner from '@/components/CodeScanner/CodeScanner'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import TopBar from '@/components/TopBar/TopBar'
import ProfileCharacter from '@/components/ProfileCharacter/ProfileCharacter'
import ActionCard from '@/components/ActionCard/ActionCard'
import throttle from 'lodash.throttle'
import { getAvatarImgSrc } from '@/core/utils/img'
import ResultAction from '@/components/ResultAction/ResultAction'

interface Props {
  currentPlayer?: IPlayer
  players: IPlayer[]
  currentRound: number
  onReadyClick: () => void
  addBag: (numero: number) => void
}

const ActionPhase: FC<Props> = ({
  currentPlayer,
  players,
  currentRound,
  onReadyClick,
  addBag,
}) => {
  const [isVisibleCodeScannerModal, setIsVisibleCodeScannerModal] =
    useState(false)
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false)
  const [scannedId, setScannedId] = useState(0)
  const [isVisibleResultAction, setIsVisibleResultAction] = useState(false)

  const throttledToast = throttle((message: string) => {
    toast(message)
  }, 5000)

  const handleScan = (data: string) => {
    if (data.startsWith('action')) {
      if (data === 'action-2' || data === 'action-3') {
        setScannedId(Number(data.replace('action-', '')))
        addBag(Number(data.replace('action-', '')))
        setIsVisibleResultAction(true)
      } else if (data === 'action-4') {
        setScannedId(Number(data.replace('action-', '')))
        setIsVisibleResultAction(true)
        toast('Piochez 2 nouvelles cartes actions')
      } else {
        throttledToast(`Carte non valide`)
      }
    } else {
      throttledToast(`Carte non valide`)
    }
  }

  return (
    <div className={styles.container}>
      {isVisibleCodeScannerModal && (
        <Modal onDismiss={() => setIsVisibleCodeScannerModal(false)}>
          {!scannedId && <CodeScanner onScan={handleScan} />}
          {isVisibleResultAction && (
            <ResultAction
              id={scannedId}
              onHide={() => {
                setIsVisibleResultAction(false)
                setIsVisibleCodeScannerModal(false)
              }}
            />
          )}
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
        onProfileClick={() => setIsProfileModalVisible(true)}
      />
      <div className={styles.wrapper}>
        <h3>
          <span>Phase de recherche d’indices</span>
        </h3>
        <p>
          <span>Tous les joueurs sont prêts.</span>
          <span>
            Un joueur mélange et distribue deux cartes action à chaque joueur.
          </span>
        </p>
        <div className={styles.buttons}>
          <div className={clsx(styles.ctaContainer, styles.action)}>
            <CTA
              onClick={() => setIsVisibleCodeScannerModal(true)}
              text="Scanner carte Indices ou Pioche"
              isHighlight
              disabled={(currentPlayer?.itemsPickupCapacity ?? 1) > 1}
            />
            {!!scannedId && (
              <div className={styles.actionCard}>
                <div className={styles.background} />
                <span>
                  {(currentPlayer?.itemsPickupCapacity ?? 0) > 1
                    ? `Sac à dos +${currentPlayer?.itemsPickupCapacity ?? 1}`
                    : 'Pioche +2'}
                </span>
              </div>
            )}
          </div>
          <div className={clsx(styles.ctaContainer, styles.ready)}>
            <CTA
              onClick={onReadyClick}
              text={
                !currentPlayer?.isReady ? 'Prêt.e pour la recherche' : 'Prêt.e!'
              }
              isHighlight={!currentPlayer?.isReady}
            />
            <div className={styles.avatars}>
              {players
                .filter((player) => player.isReady)
                .map((player) => (
                  <div className={styles.avatar} key={player.id}>
                    <img
                      src={getAvatarImgSrc(player.character?.id ?? 'ludivine')}
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActionPhase
