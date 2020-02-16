import { types } from "mobx-state-tree"

const Color = types.model("Color", {
  r: types.optional(types.number, 0),
  g: types.optional(types.number, 0),
  b: types.optional(types.number, 0),
  a: types.optional(types.number, 0.5)
})

export default Color
