import { FC, useEffect, useRef } from 'react'
import styles from './Lobby.module.scss'
import { IPlayer } from '@/core/types/Game'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { routesMap } from '@/core/routes'
import QRCodeImg from '@/assets/img/icons/qr-code.svg'
import ShareIcon from '@/assets/img/icons/share.svg'
import CopyIcon from '@/assets/img/icons/copy.svg'
import CrownIcon from '@/assets/img/icons/crown.svg'
import Button from '@/components/UI/Button/Button'
import CTA from '@/components/UI/CTA/CTA'
import QRCodeStyling from 'qr-code-styling'

interface Props {
  players: IPlayer[]
  currentPlayer?: IPlayer
  onGameStart: () => void
  toggleIsReady: () => void
  leaveRoom: () => void
}

const Lobby: FC<Props> = ({
  players,
  currentPlayer,
  onGameStart,
  toggleIsReady,
  leaveRoom,
}) => {
  const QRCodeRef = useRef<HTMLDivElement>(null)
  const QRCodeCanvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()

  const handleTryStartGame = () => {
    const isAllReady = players?.every(
      (player) => player.isReady || player.isAdmin
    )
    if (isAllReady) {
      onGameStart()
    }
  }

  const handleShareRoom = () => {
    try {
      navigator.share({
        title: 'Partage de partie',
        text: 'Rejoins ma partie sur Fatale Mascarade!',
        url: `${
          window.location.origin
        }/?q=${currentPlayer?.roomId?.toUpperCase()}`,
      })
    } catch (error) {
      console.error('Error sharing room', error)
    }
  }

  const handleToggleIsReady = () => {
    toggleIsReady()
  }

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(
      currentPlayer?.roomId?.toUpperCase() || 'XXXX'
    )
  }

  const handleLeaveRoom = () => {
    leaveRoom()
    navigate(routesMap.HOME)
  }

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: `${
        window.location.origin
      }/?q=${currentPlayer?.roomId?.toUpperCase()}`,
      margin: 0,
      qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' },
      imageOptions: { hideBackgroundDots: true, imageSize: 0, margin: 0 },
      dotsOptions: { type: 'dots', color: '#c0a9ed' },
      backgroundOptions: { color: 'transparent' },
      cornersSquareOptions: { type: 'square', color: '#c0a9ed' },
      cornersDotOptions: { type: 'square', color: '#c0a9ed' },
    })

    if (QRCodeRef.current) {
      QRCodeRef.current.innerHTML = ''
      qr.append(QRCodeRef.current)
    }
  }, [currentPlayer?.roomId])

  useEffect(() => {
    ;[
      'src/assets/img/card-character.webp',
      'src/assets/videos/ludivine.mp4',
    ].map((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={clsx(styles.group, styles.left)}>
          <h1>
            <span>Room&nbsp;{currentPlayer?.roomId || 'XXXX'}</span>
          </h1>
          <div className={styles.players}>
            <ul className={styles.scrollList}>
              {Array.from({ length: 4 }).map((_, index) => {
                const player = players?.[index]
                return (
                  <div
                    key={index}
                    className={clsx(
                      styles.player,
                      (player?.isReady || player?.isAdmin) && styles.isReady,
                      !player && styles.isEmpty
                    )}
                  >
                    <div className={styles.content}>
                      {player?.isAdmin && <img src={CrownIcon} alt="" />}
                      <span>{player?.username || 'En attente'}</span>
                    </div>
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
        <div className={clsx(styles.group, styles.right)}>
          <div className={styles.qrCode} ref={QRCodeRef}>
            <canvas ref={QRCodeCanvasRef} />
          </div>
          <div className={styles.row}>
            <Button
              onClick={handleShareRoom}
              text="Partager"
              iconSrc={ShareIcon}
            />
            <Button
              onClick={handleCopyRoomId}
              text={currentPlayer?.roomId?.toUpperCase() || 'XXXX'}
              iconSrc={CopyIcon}
            />
          </div>
          <div className={styles.toggleReady}>
            {currentPlayer?.isAdmin ? (
              <CTA
                onClick={handleTryStartGame}
                text="Lancer la partie"
                isHighlight
              />
            ) : (
              <>
                {!currentPlayer?.isReady ? (
                  <CTA
                    onClick={handleToggleIsReady}
                    text={'Prêt.e'}
                    isHighlight
                    disabled={!currentPlayer}
                  />
                ) : (
                  <span className={styles.wait}>
                    En attente des autres joueurs...
                  </span>
                )}
              </>
            )}
          </div>
          <button onClick={handleLeaveRoom} className={styles.leave}>
            Quitter la partie
          </button>
        </div>
      </div>
    </div>
  )
}

export default Lobby
