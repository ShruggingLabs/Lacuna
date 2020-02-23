import { types } from "mobx-state-tree"
import Image from "../Image"
import Style from "../Style"

export const model = {
  type: types.optional(types.string, "image"),
  image: types.optional(Image, {}),
  imageUrl: "",
  name: types.optional(types.string, "image layer"),
  style: types.optional(Style, {}),
  imageUrlDataLink: ""
}
