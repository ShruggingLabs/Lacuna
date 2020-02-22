import { types } from "mobx-state-tree"
import Layer from "./Layer"
import Image from "./Image"
import ImageLayerStyle from "./ImageLayerStyle"

const model = {
  type: types.optional(types.string, "image"),
  image: types.optional(Image, {}),
  name: types.optional(types.string, "image layer"),
  style: types.optional(ImageLayerStyle, {}),
  imageUrlDataLink: ""
}

const actions = (self) => {
  const setImage = (image) => (self.image = image)

  const setImageUrlDataLink = (key) => {
    self.imageUrlDataLink = key
  }

  return {
    setImage,
    setImageUrlDataLink
  }
}

const BaseImageLayer = types.model("BaseImageLayer", model).actions(actions)

export default types.compose(Layer, BaseImageLayer).named("ImageLayer")
