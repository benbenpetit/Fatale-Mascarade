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

const AREAS: IArea[] = [
  {
    id: 'bedroom-nicolas',
    title: `Chambre de Nicolas`,
  },
  {
    id: 'bedroom-marcus',
    title: `Chambre de Marcus`,
  },
  {
    id: 'bedroom-sophie',
    title: `Chambre de Sophie`,
  },
  {
    id: 'bedroom-ludivine',
    title: `Chambre de Ludivine`,
  },
  {
    id: 'bedroom-paul',
    title: `Chambre de Paul`,
  },
  {
    id: 'desk-nicolas',
    title: `Bureau de Nicolas`,
  },
  {
    id: 'kitchen',
    title: `Cuisine`,
  },
  {
    id: 'bathroom',
    title: `Salle de bain`,
  },
  {
    id: 'livingroom',
    title: `Entrée`,
  },
]

export default AREAS
