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
  caracteristics: {
    label: string
    value: string
  }[]
}

const CHARACTERS: ICharacter[] = [
  {
    id: 'ludivine',
    name: `Ludivine`,
    background: `Ludivine est la fille de Marcus. Elle s’est récemment fiancée à Paul. Il ne semble cependant pas l’intéresser tant que ça.`,
    caracteristics: [
      {
        label: 'Âge',
        value: '28 ans',
      },
      {
        label: 'Yeux',
        value: 'Jaunes',
      },
      {
        label: 'Cheveux',
        value: 'Verts',
      },
      {
        label: 'Corpulence',
        value: 'Fine',
      },
      {
        label: 'Taille de pieds',
        value: '38',
      },
    ],
  },
  {
    id: 'marcus',
    name: `Marcus`,
    background: `Marcus est une bonne connaissance mais également un rival de Nicolas. Il est également candidat aux municipales de Paris 9 et est actuellement le favori.`,
    caracteristics: [
      {
        label: 'Âge',
        value: '53 ans',
      },
      {
        label: 'Yeux',
        value: 'Marrons',
      },
      {
        label: 'Cheveux',
        value: 'Grisonnats et courts',
      },
      {
        label: 'Corpulence',
        value: 'Athlétique',
      },
      {
        label: 'Taille de pieds',
        value: '45',
      },
    ],
  },
  {
    id: 'sophie',
    name: `Sophie`,
    background: `Sophie est une jeune médecin qui travaille à Paris 9 dans le quartier Saint-Georges. Elle est la médecin personnelle de Nicolas.`,
    caracteristics: [
      {
        label: 'Âge',
        value: '33 ans',
      },
      {
        label: 'Yeux',
        value: 'Verts',
      },
      {
        label: 'Cheveux',
        value: 'Mi-longs et blonds',
      },
      {
        label: 'Taille',
        value: '158 cm',
      },
      {
        label: 'Corpulence',
        value: 'Athlétique',
      },
      {
        label: 'Taille de pieds',
        value: '37',
      },
    ],
  },
  {
    id: 'paul',
    name: `Paul`,
    background: `Paul est un jeune entrepreneur qui se lance dans l’informatique. Il est fiancé à Ludivine, par amour.`,
    caracteristics: [
      {
        label: 'Âge',
        value: '32 ans',
      },
      {
        label: 'Yeux',
        value: 'Marrons',
      },
      {
        label: 'Cheveux',
        value: 'Blonde et courte',
      },
      {
        label: 'Taille',
        value: '189 cm',
      },
      {
        label: 'Corpulence',
        value: 'Svelte',
      },
      {
        label: 'Taille de pieds',
        value: '44',
      },
    ],
  },
]

export default CHARACTERS
