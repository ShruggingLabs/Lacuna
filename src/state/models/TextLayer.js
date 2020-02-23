import { types } from "mobx-state-tree"

import { withEventValue } from "#utilities/withEventValue"
import Layer from "./Layer"
import Style from "./Style"

const loremText = `Lorem ipsum is placeholder text.`
//  commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.

const model = {
  type: types.optional(types.string, "text"),
  text: types.optional(types.string, loremText),
  name: types.optional(types.string, "text layer "),
  style: types.optional(Style, {}),
  isEditing: false
}

const actions = (self) => {
  const setText = withEventValue((value) => (self.text = value))
  const toggleIsEditing = (value = !self.isEditing) => (self.isEditing = value)

  return {
    setText,
    toggleIsEditing
  }
}

const BaseTextLayer = types.model("BaseTextLayer", model).actions(actions)

export default types.compose(Layer, BaseTextLayer).named("TextLayer")
