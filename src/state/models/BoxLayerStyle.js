import { types } from "mobx-state-tree"

// import { withEventValue } from '../../utilities/withEventValue'
import Style from "./Style"
import { nanoid } from "../../utilities/nanoid"

const model = {
  id: types.optional(types.identifier, () => nanoid()),
  type: "box"
}

const actions = (self) => {
  return {}
}

const BaseBoxLayerStyle = types.model("BaseBoxLayerStyle", model).actions(actions)

export default types.compose(Style, BaseBoxLayerStyle).named("BoxLayerStyle")
