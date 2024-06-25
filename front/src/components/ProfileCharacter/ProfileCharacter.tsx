import { FC, useState } from 'react'
import styles from './ProfileCharacter.module.scss'
import clsx from 'clsx'
import BadCluesList from '@/components/BadCluesList/BadCluesList'
import Modal from '@/components/UI/Modal/Modal'
import CTA from '@/components/UI/CTA/CTA'
import BackgroundWrapper from '@/components/UI/BackgroundWrapper/BackgroundWrapper'
import Frame from '@/components/UI/Frame/Frame'
import { IPlayer } from '@/core/types/Game'
import { getGifSrc } from '@/core/utils/img'
import { isIOS, isSafari } from 'react-device-detect'
import toast from 'react-hot-toast'

interface Props {
  currentPlayer?: IPlayer
  isBad?: boolean
  isFirstReveal?: boolean
  onDismiss: () => void
}

const ProfileCharacter: FC<Props> = ({
  currentPlayer,
  isBad,
  isFirstReveal,
  onDismiss,
}) => {
  const [isVisibleBadCluesModal, setIsVisibleBadCluesModal] = useState(false)
  const [isCluesSeen, setIsCluesSeen] = useState(false)

  const handleDismissClick = () => {
    if (isBad && isFirstReveal && !isCluesSeen) {
      toast('Consultez la liste d’indices à supprimer')
    } else {
      onDismiss()
    }
  }

  const handleOpenCluesClick = () => {
    setIsCluesSeen(true)
    setIsVisibleBadCluesModal(true)
  }

  return (
    <div className={styles.absolute}>
      <BackgroundWrapper>
        <Frame isFade />
        {isVisibleBadCluesModal && (
          <Modal onDismiss={() => setIsVisibleBadCluesModal(false)}>
            <BadCluesList clues={currentPlayer?.character?.cluesToHide ?? []} />
          </Modal>
        )}
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={clsx(styles.group, styles.left)}>
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
                    (currentPlayer?.character?.id ?? 'ludivine') + '-idle',
                    isSafari || isIOS ? 'mov' : 'webm'
                  )}
                  type={`video/${isSafari || isIOS ? 'mp4' : 'webm'}`}
                />
              </video>
            </div>
            <div className={clsx(styles.group, styles.right)}>
              <div className={styles.parag}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={33}
                  height={33}
                  viewBox="0 0 33 33"
                  fill="none"
                >
                  <g clipPath="url(#a)">
                    <path stroke="url(#b)" d="M27.5 10.44v23" />
                    <path stroke="url(#c)" d="M23 5.689H0" />
                    <rect
                      width={9.03}
                      height={9.03}
                      x={27.5}
                      y={-0.703}
                      stroke="#C0A9ED"
                      strokeWidth={0.42}
                      rx={4.515}
                      transform="rotate(45 27.5 -.703)"
                    />
                    <g filter="url(#d)">
                      <path
                        fill="#A7C5DB"
                        d="m27.5 3.56 2.121 2.122L27.5 7.804l-2.121-2.122z"
                      />
                    </g>
                  </g>
                  <defs>
                    <linearGradient
                      id="b"
                      x1={26.5}
                      x2={26.5}
                      y1={10.44}
                      y2={33.44}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A082DD" />
                      <stop offset={1} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="c"
                      x1={23}
                      x2={0}
                      y1={4.689}
                      y2={4.689}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A082DD" />
                      <stop offset={1} stopOpacity={0} />
                    </linearGradient>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h33v33H0z" />
                    </clipPath>
                    <filter
                      id="d"
                      width={12.243}
                      height={12.243}
                      x={21.379}
                      y={-0.439}
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                    >
                      <feFlood floodOpacity={0} result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation={2} />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix values="0 0 0 0 0.653563 0 0 0 0 0.772877 0 0 0 0 0.859277 0 0 0 1 0" />
                      <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_237_11"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_237_11"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <div className={styles.content}>
                  <span className={styles.title}>Informations générales</span>
                  <p>{currentPlayer?.character?.background}</p>
                </div>
              </div>
              <div className={styles.parag}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={33}
                  height={33}
                  viewBox="0 0 33 33"
                  fill="none"
                >
                  <g clipPath="url(#a)">
                    <path stroke="url(#b)" d="M27.5 10.44v23" />
                    <path stroke="url(#c)" d="M23 5.689H0" />
                    <rect
                      width={9.03}
                      height={9.03}
                      x={27.5}
                      y={-0.703}
                      stroke="#C0A9ED"
                      strokeWidth={0.42}
                      rx={4.515}
                      transform="rotate(45 27.5 -.703)"
                    />
                    <g filter="url(#d)">
                      <path
                        fill="#A7C5DB"
                        d="m27.5 3.56 2.121 2.122L27.5 7.804l-2.121-2.122z"
                      />
                    </g>
                  </g>
                  <defs>
                    <linearGradient
                      id="b"
                      x1={26.5}
                      x2={26.5}
                      y1={10.44}
                      y2={33.44}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A082DD" />
                      <stop offset={1} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="c"
                      x1={23}
                      x2={0}
                      y1={4.689}
                      y2={4.689}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A082DD" />
                      <stop offset={1} stopOpacity={0} />
                    </linearGradient>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h33v33H0z" />
                    </clipPath>
                    <filter
                      id="d"
                      width={12.243}
                      height={12.243}
                      x={21.379}
                      y={-0.439}
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                    >
                      <feFlood floodOpacity={0} result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation={2} />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix values="0 0 0 0 0.653563 0 0 0 0 0.772877 0 0 0 0 0.859277 0 0 0 1 0" />
                      <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_237_11"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_237_11"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <div className={styles.content}>
                  <span className={styles.title}>Mobile</span>
                  <p>{currentPlayer?.character?.mobile}</p>
                </div>
              </div>
              <div className={styles.profile}>
                {currentPlayer?.character?.caracteristics.map(
                  (caracteristic, index) => (
                    <div className={styles.characteristic} key={index}>
                      <span>{caracteristic.label}</span>
                      <span />
                      <span>{caracteristic.value}</span>
                    </div>
                  )
                )}
              </div>
              <div className={clsx(styles.buttons, isBad && styles.alignRight)}>
                <div className={styles.inside}>
                  {!isFirstReveal && (
                    <CTA
                      onClick={handleDismissClick}
                      text="Retour"
                      isHighlight={false}
                    />
                  )}
                  {isBad && (
                    <CTA
                      onClick={handleOpenCluesClick}
                      text="Liste d’indices à supprimer"
                      isHighlight={!isFirstReveal}
                    />
                  )}
                  {isFirstReveal && (
                    <CTA
                      onClick={handleDismissClick}
                      text="Commencer la partie"
                      isHighlight
                      disabled={isBad && !isCluesSeen}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundWrapper>
    </div>
  )
}

export default ProfileCharacter
