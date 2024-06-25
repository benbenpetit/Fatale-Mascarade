import { CSSProperties, FC } from 'react'
import styles from './Separator.module.scss'

interface Props {
  style?: CSSProperties
}

const Separator: FC<Props> = ({ style }) => {
  return (
    <div className={styles.container} style={style}>
      <span className={styles.point} />
      <span className={styles.line} style={{ marginRight: '1.25rem' }} />
      <div className={styles.squares}>
        <span className={styles.square} />
        <span className={styles.square} />
        <span className={styles.square} />
        <span className={styles.square} />
      </div>
      <span className={styles.line} style={{ marginLeft: '1.25rem' }} />
      <span className={styles.point} />
    </div>
  )
}

export default Separator
