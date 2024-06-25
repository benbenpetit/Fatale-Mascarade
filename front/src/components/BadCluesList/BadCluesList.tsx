import { FC, ReactNode } from 'react'
import styles from './BadCluesList.module.scss'
import Separator from '@/components/UI/Separator/Separator'

interface Props {
  clues: string[]
}

const BadCluesList: FC<Props> = ({ clues }) => {
  return (
    <div className={styles.container}>
      <h3>
        <span>Liste d'indices incriminants</span>
      </h3>
      <Separator style={{ width: '90%' }} />
      <div className={styles.clues}>
        {clues.map((clue, index) => (
          <div key={index} className={styles.clue}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={33}
              height={33}
              viewBox="0 0 33 33"
              fill="none"
            >
              <g clipPath="url(#a)">
                <path stroke="url(#b)" d="M27.5 10.44v23" />
                <path stroke="url(#c)" d="M23 5.689H0" />
                <rect
                  width={9.03}
                  height={9.03}
                  x={27.5}
                  y={-0.703}
                  stroke="#C0A9ED"
                  strokeWidth={0.42}
                  rx={4.515}
                  transform="rotate(45 27.5 -.703)"
                />
                <g filter="url(#d)">
                  <path
                    fill="#A7C5DB"
                    d="m27.5 3.56 2.121 2.122L27.5 7.804l-2.121-2.122z"
                  />
                </g>
              </g>
              <defs>
                <linearGradient
                  id="b"
                  x1={26.5}
                  x2={26.5}
                  y1={10.44}
                  y2={33.44}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#A082DD" />
                  <stop offset={1} stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="c"
                  x1={23}
                  x2={0}
                  y1={4.689}
                  y2={4.689}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#A082DD" />
                  <stop offset={1} stopOpacity={0} />
                </linearGradient>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h33v33H0z" />
                </clipPath>
                <filter
                  id="d"
                  width={12.243}
                  height={12.243}
                  x={21.379}
                  y={-0.439}
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation={2} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values="0 0 0 0 0.653563 0 0 0 0 0.772877 0 0 0 0 0.859277 0 0 0 1 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_237_11"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_237_11"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <span>{clue}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BadCluesList
