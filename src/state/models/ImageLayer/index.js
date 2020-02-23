import { types } from "mobx-state-tree"
import Layer from "../Layer"
import Image from "../Image"
import Style from "../Style"

import { model } from "./model"
import { actions } from "./actions"
import { views } from "./views"

const BaseImageLayer = types
  .model("BaseImageLayer", model)
  .actions(actions)
  .views(views)

export default types.compose(Layer, BaseImageLayer).named("ImageLayer")
