import { FC, useState } from 'react'
import styles from './ActionCard.module.scss'
import BackgroundActionImg from '@/assets/img/actions/background.webp'
import { getActionImgSrc } from '@/core/utils/img'
import ACTION_CARDS from '@/core/data/actions'
import { ItemClass } from '@/core/types/Game'

interface Props {
  qrId: number
  items: ItemClass[]
  onUnlockableItemClick: (id: string) => void
}

const ActionCard: FC<Props> = ({ qrId, items, onUnlockableItemClick }) => {
  const [unlockedItem, setUnlockedItem] = useState<ItemClass | null>(null)
  const action = ACTION_CARDS.find((action) => action.qrId === (qrId || 1))!
  const imgSrc = getActionImgSrc(action.id)
  const unlockableItems = items.filter(
    (item) => item.isLocked && item?.unlockableActionId === action.id
  )

  const handleUnlockableItemClick = (item: ItemClass) => {
    if (!unlockedItem) {
      onUnlockableItemClick(item.id)
      setUnlockedItem(item)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapperCard}>
        <div className={styles.title}>
          <span>{action.title}</span>
        </div>
        <img className={styles.img} src={imgSrc} alt={action?.title} />
        <img className={styles.bg} src={BackgroundActionImg} alt="Background" />
      </div>
      <div className={styles.wrapperList}>
        {!action.id.startsWith('bag') && (
          <h3>
            <span>
              {unlockedItem
                ? 'Indicé débloqué'
                : `Indice${items.length > 1 ? 's' : ''} déblocable${
                    items.length > 1 ? 's' : ''
                  }`}
            </span>
          </h3>
        )}
        {action.id.startsWith('bag') ? (
          <span className={styles.noItem}>
            Vous pourrez récupérer plusieurs indices lors du tour suivant.
          </span>
        ) : (
          <>
            {items.length === 0 && (
              <span className={styles.noItem}>Aucun indice déblocable</span>
            )}
            <div className={styles.scroller}>
              <ul>
                {unlockedItem ? (
                  <li>
                    <div className={styles.item}>
                      <h4>{unlockedItem.title}</h4>
                      <p>
                        <span>{unlockedItem.description}</span>
                      </p>
                    </div>
                  </li>
                ) : (
                  <>
                    {unlockableItems.map((item) => (
                      <li onClick={() => handleUnlockableItemClick(item)}>
                        <div className={styles.item}>
                          <h4>{item.title}</h4>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ActionCard
