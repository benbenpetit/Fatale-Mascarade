import { FC, useState } from 'react'
import styles from './CollectedItems.module.scss'
import { ItemClass, TypeAreaIds } from '@/core/types/Game'
import clsx from 'clsx'
import ACTION_CARDS from '@/core/data/actions'
import CTA from '@/components/UI/CTA/CTA'
import CodeScanner from '@/components/CodeScanner/CodeScanner'
import throttle from 'lodash.throttle'
import toast from 'react-hot-toast'
import ResultAction from '@/components/ResultAction/ResultAction'
import AREAS from '@/core/data/areas'

interface Props {
  newItems: ItemClass[]
  items: ItemClass[]
  onUnlockItem: (id: string) => void
}

const CollectedItems: FC<Props> = ({ newItems, items, onUnlockItem }) => {
  const [isVisibleCodeScannerModal, setIsVisibleCodeScannerModal] =
    useState(false)
  const [unlockingItem, setUnlockingItem] = useState<ItemClass | null>(null)
  const [scannedId, setScannedId] = useState(0)
  const [isVisibleResultAction, setIsVisibleResultAction] = useState(false)

  const handleUnlockButtonClick = (item: ItemClass) => {
    setUnlockingItem(item)
    setIsVisibleCodeScannerModal(true)
  }

  const throttledToast = throttle((message: string) => {
    toast(message)
  }, 5000)

  const handleScan = (data: string) => {
    if (data.startsWith('action')) {
      const unlockActionCard = ACTION_CARDS.find(
        (action) => action.id === unlockingItem?.unlockableActionId
      )
      const id = data.replace('action-', '')
      if (unlockActionCard?.qrId === Number(id)) {
        setScannedId(Number(id))
        setIsVisibleCodeScannerModal(false)
        setIsVisibleResultAction(true)
        if (unlockingItem) {
          onUnlockItem(unlockingItem.id)
        }
      } else {
        throttledToast('Mauvaise carte action')
      }
    } else {
      throttledToast('Cette carte n’est pas une action')
    }
  }

  const getAreaTitle = (areaId: TypeAreaIds) => {
    return AREAS.find((area) => area.id === areaId)?.title
  }

  return (
    <>
      {isVisibleCodeScannerModal && <CodeScanner onScan={handleScan} />}
      {isVisibleResultAction && (
        <ResultAction
          id={scannedId}
          onHide={() => setIsVisibleResultAction(false)}
        />
      )}
      {!isVisibleCodeScannerModal && !isVisibleResultAction && (
        <div className={styles.container}>
          <h3>
            <span>Indices trouvés</span>
          </h3>
          <div className={styles.scroller}>
            <ul>
              {[...newItems, ...items].map((item) => {
                const isNew = newItems.includes(item)
                const unlockActionCard = ACTION_CARDS.find(
                  (action) => action.id === item.unlockableActionId
                )

                return (
                  <li>
                    <div
                      className={clsx(
                        styles.item,
                        isNew && styles.isNew,
                        item.isLocked && styles.isLocked
                      )}
                    >
                      {isNew && (
                        <div className={styles.star}>
                          <svg width="13" height="19" viewBox="0 0 13 19">
                            <path
                              d="M6.5 -3.8147e-06L6.45879 2.93749C6.4088 6.50089 3.56214 9.39326 0 9.5C3.56214 9.60674 6.4088 12.4991 6.45879 16.0625L6.5 19L6.54121 16.0625C6.5912 12.4991 9.43786 9.60674 13 9.5C9.43786 9.39326 6.5912 6.50088 6.54121 2.93749L6.5 -3.8147e-06Z"
                              fill="#A7C5DB"
                            />
                          </svg>
                        </div>
                      )}
                      <div className={styles.content}>
                        <div className={styles.inside}>
                          <span className={styles.areaTitle}>
                            {getAreaTitle(item.areaId)}
                          </span>
                          <h4>{item.title}</h4>
                          {!item.isLocked && (
                            <p>
                              <span>{item.description}</span>
                            </p>
                          )}
                        </div>
                        {unlockActionCard && item.isLocked && (
                          <div className={styles.unlockButton}>
                            <CTA
                              onClick={() => handleUnlockButtonClick(item)}
                              text={`Carte ${unlockActionCard.title}`}
                              isHighlight
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default CollectedItems
