import { types, flow, getParent, getRoot } from "mobx-state-tree"
import { autorun, reaction, action } from "mobx"

import { withEventValue } from "../../utilities/withEventValue"
import Style from "./Style"
import { nanoid } from "../../utilities/nanoid"
import { fontsManager } from "../../utilities/fontsManager"
import Store from "../"
import Color from "./Color"
import rgbHex from "rgb-hex"

const model = {
  id: types.optional(types.identifier, () => nanoid()),
  type: "text",
  fontFamily: `Work Sans`,
  fontSize: 16,
  fontWeight: "400",
  fontStyle: "normal",
  letterSpacing: 0,
  lineHeight: 1,
  color: types.optional(Color, { r: 0, g: 0, b: 0, a: 1 }),
  overflow: "visible",
  verticalAlign: "middle",
  align: "left",
  isLoadingFont: false
}

const actions = (self) => {
  const setColor = (value) => (self.color = value)
  const setFontSize = withEventValue((value) => (self.fontSize = Number(value)))

  const setFontFamily = (value) => {
    self.fontFamily = value
    self.fontWeight = "400"
  }

  const setFontWeight = withEventValue((value) => (self.fontWeight = value))
  const setFontStyle = withEventValue((value) => (self.fontStyle = value))
  const setLineHeight = withEventValue((value) => (self.lineHeight = Number(value)))
  const setLetterSpacing = withEventValue((value) => (self.letterSpacing = Number(value)))
  const setIsLoadingFont = action((value) => (self.isLoadingFont = value))

  return {
    setColor,
    setFontSize,
    setFontWeight,
    setFontStyle,
    setLineHeight,
    setFontFamily,
    setLetterSpacing
  }
}

const views = (self) => {
  return {
    get rgbaColorString() {
      const { r, g, b, a } = self.color
      return `rgba(${r}, ${g}, ${b}, ${a})`
    },

    get hexaColor() {
      const { r, g, b, a } = self.color
      return "#" + rgbHex(r, g, b, a)
    }
  }
}

const BaseTextLayerStyle = types
  .model("BaseTextLayer", model)
  .actions(actions)
  .views(views)

export default types.compose(Style, BaseTextLayerStyle).named("TextLayerStyle")
