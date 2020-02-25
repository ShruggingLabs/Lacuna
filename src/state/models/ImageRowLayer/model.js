import { types } from "mobx-state-tree"
import Layer from "../Layer"
import Style from "../Style"

export const model = {
  type: types.optional(types.string, "imageRow"),
  name: types.optional(types.string, "image row"),
  style: types.optional(Style, {}),
  imageRowUrlsDataLink: ""
}
