import { observable } from 'mobx'
import nanoid from 'nanoid'

const state = observable({
  layers: [],
  selectedLayerId: '',
})

const addTextLayer = () => {
  state.layers.push({
    id: nanoid(),
    name: 'text',
    text: 'lorem ipsum dolor a sit...',
    styleWidth: 200,
    styleHeight: 200,
  })
}

const setSelectedLayerId = (id) => {
  state.selectedLayerId = id
}

export const layersStore = {
  state,
  addTextLayer,
  setSelectedLayerId,
}
