import CHARACTERS, { TypeCharactersIds } from '../data/Characters.js'

class CharacterClass {
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

  constructor(
    id: TypeCharactersIds,
    mobile: string,
    isBad?: boolean,
    cluesToHide?: string[]
  ) {
    this.id = id
    const character = CHARACTERS.find((character) => character.id === id)!
    this.name = character.name
    this.background = character.background
    this.mobile = mobile
    this.caracteristics = character.caracteristics
    this.isBad = isBad
    this.cluesToHide = cluesToHide
  }
}

export default CharacterClass
