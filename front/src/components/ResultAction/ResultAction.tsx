import { FC, useEffect } from 'react'
import styles from './ResultAction.module.scss'
import ACTION_CARDS from '@/core/data/actions'
import BackgroundActionImg from '@/assets/img/actions/background.webp'
import { getActionImgSrc } from '@/core/utils/img'

interface Props {
  id: number
  onHide: () => void
}

const ResultAction: FC<Props> = ({ id, onHide }) => {
  const action = ACTION_CARDS.find((action) => action.qrId === id)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      onHide()
    }, 3000)

    return () => clearTimeout(timeOut)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapperCard}>
        <div className={styles.title}>
          <span>{action?.title}</span>
        </div>
        {action?.id && (
          <img
            className={styles.img}
            src={getActionImgSrc(action.id)}
            alt={action?.title}
          />
        )}
        <img className={styles.bg} src={BackgroundActionImg} alt="Background" />
      </div>
    </div>
  )
}

export default ResultAction
