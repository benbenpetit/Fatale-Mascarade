import { FC, ReactNode } from 'react'
import styles from './Modal.module.scss'
import EllipsePurpleImg from '@/assets/img/shapes/ellipse-purple.avif'
import EllipseGrayImg from '@/assets/img/shapes/ellipse-gray.avif'

interface Props {
  onDismiss: () => void
  children: ReactNode
}

const Modal: FC<Props> = ({ onDismiss, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.background}>
          <div className={styles.frame}>
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index} className={styles.cornerCircle} />
            ))}
          </div>
          <div className={styles.shapes}>
            <img src={EllipsePurpleImg} alt="" />
            <img src={EllipsePurpleImg} alt="" />
            <img src={EllipseGrayImg} alt="" />
            <img src={EllipseGrayImg} alt="" />
            <img src={EllipseGrayImg} alt="" />
          </div>
        </div>
        <div className={styles.stars}>
          {Array.from({ length: 4 }).map((_, index) => (
            <svg key={index} width="13" height="19" viewBox="0 0 13 19">
              <path
                d="M6.5 -3.8147e-06L6.45879 2.93749C6.4088 6.50089 3.56214 9.39326 0 9.5C3.56214 9.60674 6.4088 12.4991 6.45879 16.0625L6.5 19L6.54121 16.0625C6.5912 12.4991 9.43786 9.60674 13 9.5C9.43786 9.39326 6.5912 6.50088 6.54121 2.93749L6.5 -3.8147e-06Z"
                fill="#C0A9ED"
              />
            </svg>
          ))}
        </div>
        <div className={styles.dismissButton}>
          <button onClick={onDismiss}>
            <div className={styles.shapes}>
              <img src={EllipsePurpleImg} alt="" />
              <img src={EllipsePurpleImg} alt="" />
              <img src={EllipseGrayImg} alt="" />
              <img src={EllipseGrayImg} alt="" />
              <img src={EllipseGrayImg} alt="" />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={44}
              height={44}
              fill="none"
            >
              <path
                stroke="#C0A9ED"
                strokeLinecap="round"
                strokeWidth={0.8}
                d="M12.061 13.845A12.642 12.642 0 0 0 9.094 22c0 3.203 1.187 6.13 3.145 8.363M13.5 12.386a12.643 12.643 0 0 1 8.287-3.078c3.285 0 6.279 1.248 8.533 3.296m-16.582 19.21a12.64 12.64 0 0 0 8.049 2.878c3.132 0 6-1.134 8.213-3.015m1.289-1.262A12.644 12.644 0 0 0 34.479 22c0-3.188-1.175-6.101-3.116-8.33"
                style={{
                  opacity: 0.75,
                }}
              />
              <path
                fill="#C0A9ED"
                d="M32.454 11.513 24.85 22.18l7.603 10.668-10.667-7.603-10.667 7.603 7.603-10.668-7.603-10.667 10.667 7.603 10.667-7.603Z"
              />
            </svg>
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
