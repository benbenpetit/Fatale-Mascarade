import { FC, ReactNode } from 'react'
import styles from './BackgroundWrapper.module.scss'
import EllipsePurpleImg from '@/assets/img/shapes/ellipse-purple.avif'
import EllipseGrayImg from '@/assets/img/shapes/ellipse-gray.avif'

interface Props {
  children: ReactNode
}

const BackgroundWrapper: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.shapes}>
        <img src={EllipsePurpleImg} alt="" />
        <img src={EllipsePurpleImg} alt="" />
        <img src={EllipseGrayImg} alt="" />
        <img src={EllipseGrayImg} alt="" />
        <img src={EllipseGrayImg} alt="" />
      </div>
      <div className={styles.wrapper}>{children}</div>
    </div>
  )
}

export default BackgroundWrapper
