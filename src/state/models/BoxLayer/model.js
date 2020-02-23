import { types } from "mobx-state-tree"
import Layer from "../Layer"
import Style from "../Style"

export const model = {
  type: types.optional(types.string, "box"),
  name: types.optional(types.string, "box layer"),
  style: types.optional(Style, {})
}
