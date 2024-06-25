import { nanoid } from 'nanoid'
import { TypeActionCardIds } from './ActionCard.js'
import { TypeAreaIds } from '../data/Areas.js'

class ItemClass {
  id: string
  title: string
  description: string
  areaId: TypeAreaIds
  isPickedUp: boolean
  isLocked: boolean
  unlockableActionId: TypeActionCardIds | ''
  x: number
  y: number

  constructor(
    title: string,
    description: string,
    areaId: TypeAreaIds,
    isLocked: boolean,
    unlockableActionId: TypeActionCardIds | '',
    x: number,
    y: number
  ) {
    this.id = nanoid()
    this.title = title
    this.description = description
    this.areaId = areaId
    this.isPickedUp = false
    this.isLocked = isLocked
    this.unlockableActionId = unlockableActionId
    this.x = x
    this.y = y
  }
}

export default ItemClass
