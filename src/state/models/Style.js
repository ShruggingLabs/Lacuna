import { types } from "mobx-state-tree"

import { LAYER_TYPES_ENUM } from "./consts"
import { withEventValue } from "../../utilities/withEventValue"
import Color from "./Color"

const model = {
  id: types.identifier,
  type: LAYER_TYPES_ENUM,
  top: 50,
  left: 50,
  width: 350,
  height: types.optional(types.number, 100),
  opacity: 1,
  position: "absolute",
  backgroundColor: types.optional(Color, {})
}

const actions = (self) => {
  const setTop = withEventValue((value) => (self.top = Number(value)))
  const setLeft = withEventValue((value) => (self.left = Number(value)))
  const setWidth = withEventValue((value) => (self.width = Number(value)))
  const setHeight = withEventValue((value) => (self.height = Number(value)))
  const setOpacity = withEventValue((value) => (self.opacity = Number(value)))
  const setBackgroundColor = (value) => (self.backgroundColor = value)

  const afterCreate = () => {}

  return {
    afterCreate,
    setTop,
    setLeft,
    setWidth,
    setHeight,
    setOpacity,
    setBackgroundColor
  }
}

const views = (self) => {
  return {
    get rgbaBackgroundColorString() {
      const { r, g, b, a } = self.backgroundColor
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }
  }
}

export default types
  .model("Style", model)
  .actions(actions)
  .views(views)
