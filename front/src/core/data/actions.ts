export type TypeActionCardIds =
  | 'hacking'
  | 'bag-2'
  | 'bag-3'
  | 'pick'
  | 'analyze-object'
  | 'mesure'
  | 'analyze-substance'
  | 'analyze-appearence'

export interface IActionCard {
  id: TypeActionCardIds
  qrId: number
  title: string
}

const ACTION_CARDS: IActionCard[] = [
  {
    id: 'hacking',
    qrId: 1,
    title: 'Hacking',
  },
  {
    id: 'bag-2',
    qrId: 2,
    title: 'Indices +2',
  },
  {
    id: 'bag-3',
    qrId: 3,
    title: 'Indices +3',
  },
  {
    id: 'pick',
    qrId: 4,
    title: 'Pioche +2',
  },
  {
    id: 'analyze-object',
    qrId: 5,
    title: 'Analyse objet usé',
  },
  {
    id: 'mesure',
    qrId: 6,
    title: 'Mesure',
  },
  {
    id: 'analyze-substance',
    qrId: 7,
    title: 'Analyse substance',
  },
  {
    id: 'analyze-appearence',
    qrId: 8,
    title: 'Analyse apparence',
  },
]

export default ACTION_CARDS
