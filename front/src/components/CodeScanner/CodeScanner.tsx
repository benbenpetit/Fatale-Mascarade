import { FC, useEffect, useRef } from 'react'
import styles from './CodeScanner.module.scss'
import QrScanner from 'qr-scanner'

interface Props {
  onScan: (data: string) => void
}

const CodeScanner: FC<Props> = ({ onScan }) => {
  const scanner = useRef<QrScanner>()
  const videoEl = useRef<HTMLVideoElement>(null)

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    onScan(result?.data)
  }

  useEffect(() => {
    navigator?.mediaDevices
      ?.getUserMedia({ video: { facingMode: 'environment' } })
      .then(() => {
        if (videoEl?.current && !scanner.current) {
          scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
            preferredCamera: 'environment',
            highlightScanRegion: true,
            highlightCodeOutline: true,
            maxScansPerSecond: 5,
            returnDetailedScanResult: true,
          })

          try {
            scanner?.current?.start()
          } catch (error) {
            console.error('Error starting scanner', error)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })

    return () => {
      scanner?.current?.stop()
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video ref={videoEl} />
      </div>
    </div>
  )
}

export default CodeScanner
