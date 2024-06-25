import { FC, ReactNode, useState } from 'react'
import styles from './CTA.module.scss'
import clsx from 'clsx'
import SideTriangle from '@/components/UI/CTA/SideTriangle/SideTriangle'
import LittleStarImg from '@/assets/img/icons/little-star.svg'
import SideStarImg from './side-star.svg'

interface Props {
  onClick?: () => void
  withSideStars?: boolean
  text: string
  iconSrc?: string
  isHighlight?: boolean
  disabled?: boolean
}

const CTA: FC<Props> = ({
  onClick,
  withSideStars,
  text,
  iconSrc,
  isHighlight,
  disabled,
}) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={clsx(
        styles.container,
        isHover && styles.isHover,
        disabled && styles.disabled
      )}
    >
      {withSideStars && (
        <img
          className={clsx(styles.sideStar, styles.first)}
          src={SideStarImg}
          alt=""
        />
      )}
      <div className={styles.buttonWrapper}>
        <button
          onClick={!disabled ? onClick : undefined}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onFocus={() => setIsHover(true)}
          onBlur={() => setIsHover(false)}
          disabled={disabled}
        >
          <div className={styles.behindSquare}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className={styles.square} />
            ))}
          </div>
          <div className={styles.insideWrapper}>
            <div className={clsx(styles.triangle, styles.first)}>
              <SideTriangle style={{ fill: '#33037F' }} />
            </div>
            <div className={clsx(styles.triangle, styles.second)}>
              <SideTriangle style={{ fill: '#210354' }} />
            </div>
            <div className={styles.inside}>
              <img className={styles.littleStar} src={LittleStarImg} alt="" />
              <div className={styles.content}>
                {iconSrc && (
                  <div className={styles.icon}>
                    <img src={iconSrc} alt="" />
                  </div>
                )}
                <span
                  className={clsx(
                    styles.text,
                    isHighlight && styles.isHighlight
                  )}
                >
                  {text}
                </span>
              </div>
              <img className={styles.littleStar} src={LittleStarImg} alt="" />
            </div>
          </div>
        </button>
        <span className={clsx(styles.lightLine, styles.first)} />
        <span className={clsx(styles.lightLine, styles.second)} />
        <svg
          className={styles.lightBlur}
          xmlns="http://www.w3.org/2000/svg"
          width={160}
          height={25}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 160 25"
        >
          <g filter="url(#a)" opacity={1}>
            <path
              fill="url(#b)"
              d="M11.124 14.373 10 14.5h140a611.501 611.501 0 0 0-138.876-.127Z"
            />
          </g>
          <defs>
            <linearGradient
              id="b"
              x1={150}
              x2={10}
              y1={10.5}
              y2={10.5}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C0A9ED" stopOpacity={0} />
              <stop offset={0.5} stopColor="#C0A9ED" />
              <stop offset={1} stopColor="#C0A9ED" stopOpacity={0} />
            </linearGradient>
            <filter
              id="a"
              width={160}
              height={24.019}
              x={0}
              y={0.481}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_35_1849"
                stdDeviation={5}
              />
            </filter>
          </defs>
        </svg>
      </div>
      {withSideStars && (
        <img
          className={clsx(styles.sideStar, styles.second)}
          src={SideStarImg}
          alt=""
        />
      )}
    </div>
  )
}

export default CTA
