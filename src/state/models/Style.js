import { types } from "mobx-state-tree"

import { LAYER_TYPES_ENUM } from "./consts"
import { withEventValue } from "../../utilities/withEventValue"
import Color from "./Color"
import { minMax } from "./../../utilities/minMax"

const Width = types.refinement(types.number, (n) => minMax(0, 2550)(n))
const Height = types.union(
  types.refinement(types.number, (n) => minMax(0, 3300)(n)),
  types.string
)

const model = {
  id: types.identifier,
  type: LAYER_TYPES_ENUM,
  top: 2,
  left: 2,
  opacity: 1,
  position: "absolute",
  display: "flex",
  width: types.optional(Width, 10),
  height: types.optional(Height, 20),
  backgroundColor: types.optional(Color, {})
}

const actions = (self) => {
  const leftMinMax = minMax(0, 2550)
  const topMinMax = minMax(0, 3300)
  const sizeMinMax = minMax(1, 3300)

  const setTop = (value) => {
    self.top = Math.round(topMinMax(Number(value)))
  }

  const setLeft = (value) => {
    self.left = Math.round(leftMinMax(Number(value)))
  }

  const setWidth = (value) => (self.width = Math.round(sizeMinMax(Number(value))))
  const setHeight = (value) => (self.height = Math.round(sizeMinMax(Number(value))))
  const setOpacity = (value) => (self.opacity = Number(Number.parseFloat(value).toFixed(1)))
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
    },

    get documentLayerStyles() {
      return {
        cursor: "pointer",
        userSelect: "none",
        display: self.display,
        position: self.position,
        opacity: self.opacity,
        width: self.width + "%",
        height: self.height + "%",
        top: self.top + "%",
        left: self.left + "%"
      }
    }
  }
}

export default types
  .model("Style", model)
  .actions(actions)
  .views(views)
