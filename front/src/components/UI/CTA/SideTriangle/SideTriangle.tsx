import { CSSProperties, FC } from 'react'
import styles from './SideTriangle.module.scss'

interface Props {
  style?: CSSProperties
}

const SideTriangle: FC<Props> = ({ style }) => {
  return (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={52}
      preserveAspectRatio="none"
      viewBox="0 0 19 52"
      style={{ strokeWidth: '0.15vmin', ...style }}
    >
      <path stroke="#5e08cf" d="M18 50.435.614 26 18 1.565v48.87Z" />
    </svg>
  )
}

export default SideTriangle
