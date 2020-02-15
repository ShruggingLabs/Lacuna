import { types } from 'mobx-state-tree'

// import { withEventValue } from '../../utilities/withEventValue'
import Style from './Style'
import { nanoid } from '../../utilities/nanoid'

const model = {
  id: types.optional(types.identifier, () => nanoid()),
  type: 'image',
}

const actions = (self) => {
  return {}
}

const BaseImageLayerStyle = types.model('BaseImageLayer', model).actions(actions)

export default types
  .compose(
    Style,
    BaseImageLayerStyle,
  )
  .named('ImageLayerStyle')
