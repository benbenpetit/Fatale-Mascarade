import { FC, useState } from 'react'
import styles from './RoleReveal.module.scss'
import clsx from 'clsx'
import CardImg from '@/assets/img/card-character.webp'
import CTA from '@/components/UI/CTA/CTA'
import Modal from '@/components/UI/Modal/Modal'
import CodeScanner from '@/components/CodeScanner/CodeScanner'
import ProfileCharacter from '@/components/ProfileCharacter/ProfileCharacter'
import { IPlayer } from '@/core/types/Game'
import { getGifSrc } from '@/core/utils/img'
import { isIOS, isSafari } from 'react-device-detect'

interface Props {
  currentPlayer?: IPlayer
  onQRCharacterScan: (characterId: string) => void
  isBad?: boolean
  onDismiss: () => void
}

const RoleReveal: FC<Props> = ({
  currentPlayer,
  onQRCharacterScan,
  isBad,
  onDismiss,
}) => {
  const [isVisibleCodeScannerModal, setIsVisibleCodeScannerModal] =
    useState(false)
  const [isCharacterScanned, setIsCharacterScanned] = useState(false)

  const handleScan = (data: string) => {
    if (data === 'ludivine') {
      onQRCharacterScan('ludivine')
      setIsVisibleCodeScannerModal(false)
    }
  }

  return (
    <div className={styles.container}>
      {isVisibleCodeScannerModal && (
        <Modal onDismiss={() => setIsVisibleCodeScannerModal(false)}>
          <CodeScanner onScan={handleScan} />
        </Modal>
      )}
      {!isCharacterScanned ? (
        <div className={styles.wrapperReveal}>
          <div className={clsx(styles.group, styles.left)}>
            <div className={styles.cardContainer}>
              <span className={styles.nickname}>
                {currentPlayer?.character?.name}
              </span>
              <video
                className={styles.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source
                  src={getGifSrc(
                    currentPlayer?.character?.id ?? 'ludivine',
                    isSafari || isIOS ? 'mov' : 'webm'
                  )}
                  type={`video/${isSafari || isIOS ? 'mp4' : 'webm'}`}
                />
              </video>
              <img
                className={styles.card}
                src={CardImg}
                alt=""
                width={310}
                height={416}
              />
            </div>
          </div>
          <div className={clsx(styles.group, styles.right)}>
            <h2>
              <span>Tu</span>
              <span>es...</span>
              <div className={styles.starContainer}>
                <span>
                  {currentPlayer?.character?.isBad
                    ? 'meurtrier.ère'
                    : 'innocent.e'}
                </span>
                <div className={styles.stars}>
                  <svg width="13" height="19" viewBox="0 0 13 19">
                    <path
                      d="M6.5 -3.8147e-06L6.45879 2.93749C6.4088 6.50089 3.56214 9.39326 0 9.5C3.56214 9.60674 6.4088 12.4991 6.45879 16.0625L6.5 19L6.54121 16.0625C6.5912 12.4991 9.43786 9.60674 13 9.5C9.43786 9.39326 6.5912 6.50088 6.54121 2.93749L6.5 -3.8147e-06Z"
                      fill="#A7C5DB"
                    />
                  </svg>
                  <svg width="13" height="19" viewBox="0 0 13 19">
                    <path
                      d="M6.5 -3.8147e-06L6.45879 2.93749C6.4088 6.50089 3.56214 9.39326 0 9.5C3.56214 9.60674 6.4088 12.4991 6.45879 16.0625L6.5 19L6.54121 16.0625C6.5912 12.4991 9.43786 9.60674 13 9.5C9.43786 9.39326 6.5912 6.50088 6.54121 2.93749L6.5 -3.8147e-06Z"
                      fill="#A7C5DB"
                    />
                  </svg>
                </div>
              </div>
            </h2>
            <div className={styles.contentWrapper}>
              {isBad ? (
                <>
                  <p>
                    Personne ne doit le découvrir avant la fin des{' '}
                    <i>5 tours</i>.
                  </p>
                  <p>Effacez vos traces.</p>
                </>
              ) : (
                <p>
                  Vous devez trouver qui a commis le meurtre avant la fin des{' '}
                  <i>5 tours</i>.
                </p>
              )}
              <CTA
                // onClick={() => setIsVisibleModal(true)}
                onClick={() => setIsCharacterScanned(true)}
                text={`Continuer`}
                isHighlight
              />
            </div>
          </div>
        </div>
      ) : (
        <ProfileCharacter
          currentPlayer={currentPlayer}
          isBad={isBad}
          isFirstReveal
          onDismiss={onDismiss}
        />
      )}
    </div>
  )
}

export default RoleReveal
