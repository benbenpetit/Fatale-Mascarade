export interface IPlayer {
  id: string
  username: string
  roomId: string
  isReady: boolean
  isAdmin: boolean
  character?: ICharacter
  items: ItemClass[]
  currentRoundItems: ItemClass[]
  itemsPickupCapacity: number
  actionCards: ActionCardClass[]
  currentAreaId: TypeAreaIds
}

export interface ItemClass {
  id: string
  title: string
  description: string
  areaId: TypeAreaIds
  isPickedUp: boolean
  isLocked: boolean
  unlockableActionId?: string
  x: number
  y: number
}

export type TypeActionCardIds =
  | 'hacking'
  | 'bag-2'
  | 'bag-3'
  | 'pick'
  | 'analyze-object'
  | 'mesure'
  | 'analyze-substance'
  | 'analyze-appearence'

export interface ActionCardClass {
  id: TypeActionCardIds
  qrId: number
  title: string
}

export type TypeAreaIds =
  | 'bedroom-nicolas'
  | 'bedroom-marcus'
  | 'bedroom-sophie'
  | 'bedroom-ludivine'
  | 'bedroom-paul'
  | 'desk-nicolas'
  | 'kitchen'
  | 'bathroom'
  | 'livingroom'

export interface IArea {
  id: TypeAreaIds
  title: string
}

export interface AreaClass {
  id: string
  title: string
  items: ItemClass[]
  isDeadArea: boolean
}

export type TypeCharactersIds =
  | 'ludivine'
  | 'marcus'
  | 'sophie'
  | 'paul'
  | 'cédric'

export interface ICharacter {
  id: TypeCharactersIds
  name: string
  background: string
  mobile: string
  caracteristics: {
    label: string
    value: string
  }[]
  isBad?: boolean
  cluesToHide?: string[]
}
