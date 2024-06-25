import { FC } from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'

interface Props {
  onClick?: () => void
  text: string
  iconSrc?: string
}

const Button: FC<Props> = ({ onClick, text, iconSrc }) => {
  return (
    <button onClick={onClick} className={styles.container}>
      <span className={styles.text}>{text}</span>
      {iconSrc && <img className={styles.icon} src={iconSrc} alt={text} />}
      <span className={clsx(styles.lightLine, styles.first)} />
      <span className={clsx(styles.lightLine, styles.second)} />
    </button>
  )
}

export default Button
