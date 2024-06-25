import { FC, ReactNode } from 'react'
import styles from './BubbleCTA.module.scss'

interface Props {
  onClick?: () => void
  text: string
  iconSrc?: string
}

const BubbleCTA: FC<Props> = ({ onClick, text, iconSrc }) => {
  return (
    <button className={styles.container} onClick={onClick}>
      <div className={styles.icon}>
        <img src={iconSrc} alt="" width={34} height={34} />
      </div>
      <span className={styles.text}>{text}</span>
    </button>
  )
}

export default BubbleCTA
