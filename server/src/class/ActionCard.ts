import ACTIONS_CARDS from '../data/ActionCards.js'

export type TypeActionCardIds =
  | 'hacking'
  | 'bag-2'
  | 'bag-3'
  | 'pick'
  | 'analyze-object'
  | 'mesure'
  | 'analyze-substance'
  | 'analyze-appearence'

class ActionCardClass {
  id: TypeActionCardIds
  qrId: number
  title: string

  constructor(id: TypeActionCardIds) {
    const action = ACTIONS_CARDS.find((action) => action.id === id)!
    this.id = id
    this.qrId = action.qrId
    this.title = action.title
  }
}

export default ActionCardClass
