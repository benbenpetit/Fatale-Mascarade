import styles from './GameTitleScreen.module.scss'
import LogoImg from './logo.svg'
import GhostImg from './ghost.svg'
import EllipseImg from './ellipse.svg'
import CircleImg from './circle.svg'
import { FC } from 'react'

interface Props {
  onClick: () => void
}

const GameTitleScreen: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.logo}>
        <img className={styles.realLogo} src={LogoImg} alt="" />
        <img className={styles.logoBackdrop} src={LogoImg} alt="" />
        <img className={styles.logoEllipse} src={EllipseImg} alt="" />
        <img className={styles.logoCircle} src={CircleImg} alt="" />
        <span className={styles.subtitle}>touchez l’écran pour commencer</span>
      </div>
      <div className={styles.ghost}>
        <img src={GhostImg} alt="" />
        <img src={GhostImg} alt="" />
      </div>
    </div>
  )
}

export default GameTitleScreen
