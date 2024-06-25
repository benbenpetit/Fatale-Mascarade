import AREAS, { TypeAreaIds } from '../data/Areas.js'
import ItemClass from './Item.js'

class AreaClass {
  id: TypeAreaIds
  title: string
  items: ItemClass[]
  isDeadArea: boolean

  constructor(
    id: TypeAreaIds,
    items?: ItemClass[],
    isDeadArea: boolean = false
  ) {
    this.id = id
    this.title = AREAS.find((area) => area.id === id)!.title
    this.items = items || []
    this.isDeadArea = isDeadArea
  }
}

export default AreaClass
