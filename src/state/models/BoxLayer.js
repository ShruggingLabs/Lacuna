import { types } from "mobx-state-tree"
import Layer from "./Layer"
import BoxLayerStyle from "./BoxLayerStyle"

const model = {
  type: types.optional(types.string, "box"),
  name: types.optional(types.string, "box layer"),
  style: types.optional(BoxLayerStyle, {})
}

const actions = (self) => {
  return {}
}

const BaseBoxLayer = types.model("BaseBoxLayer", model).actions(actions)

export default types.compose(Layer, BaseBoxLayer).named("BoxLayer")
