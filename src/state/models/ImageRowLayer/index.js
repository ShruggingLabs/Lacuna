import { types } from "mobx-state-tree"
import Layer from "../Layer"
import Style from "../Style"

import { model } from "./model"
import { actions } from "./actions"
import { views } from "./views"

const BaseImageRowLayer = types
  .model("BaseImageRowLayer", model)
  .actions(actions)
  .views(views)

export default types.compose(Layer, BaseImageRowLayer).named("ImageRowLayer")
