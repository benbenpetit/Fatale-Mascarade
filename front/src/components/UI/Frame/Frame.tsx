import { FC } from 'react'
import styles from './Frame.module.scss'
import HatchedSquareIcon from '@/assets/img/icons/hatched-square.svg'
import StarIcon from '@/assets/img/icons/star.svg'
import LittleStarIcon from '@/assets/img/icons/little-star.svg'
import clsx from 'clsx'

interface Props {
  isFade?: boolean
}

const Frame: FC<Props> = ({ isFade }) => {
  return (
    <div className={clsx(styles.container, isFade && styles.isFade)}>
      <div className={styles.sideGroup}>
        <img className={styles.hatchedSquare} src={HatchedSquareIcon} alt="" />
        <span className={styles.line} />
        <img className={styles.star} src={StarIcon} alt="" />
        <img className={styles.hatchedSquare} src={HatchedSquareIcon} alt="" />
      </div>
      <div className={styles.centerGroup}>
        <div className={styles.horizontal}>
          <img className={styles.littleStar} src={LittleStarIcon} alt="" />
          <span className={styles.line} />
          <img className={styles.littleStar} src={LittleStarIcon} alt="" />
        </div>
        <div className={styles.horizontal}>
          <img className={styles.littleStar} src={LittleStarIcon} alt="" />
          <span className={styles.line} />
          <img className={styles.littleStar} src={LittleStarIcon} alt="" />
        </div>
      </div>
      <div className={styles.sideGroup}>
        <img className={styles.hatchedSquare} src={HatchedSquareIcon} alt="" />
        <span className={styles.line} />
        <img className={styles.star} src={StarIcon} alt="" />
        <span className={styles.line} />
        <img className={styles.hatchedSquare} src={HatchedSquareIcon} alt="" />
      </div>
    </div>
  )
}

export default Frame
