import { types } from "mobx-state-tree"

import { LAYER_TYPES_ENUM } from "./consts"
import { withEventValue } from "../../utilities/withEventValue"
import Color from "./Color"
import { minMax } from "./../../utilities/minMax"
import nanoid from "nanoid"

const minMaxString = (min, max) => (s) => minMax(min, max)(Number(s))

const Width = types.refinement(types.string, minMaxString(0, 2550))
const Height = types.refinement(types.string, minMaxString(0, 3300))

const stringOrNumber = (defaultValue) =>
  types.optional(types.union(types.string, types.number), defaultValue)

const model = {
  id: types.optional(types.identifier, () => nanoid()),
  top: stringOrNumber("2"),
  left: stringOrNumber("2"),
  opacity: stringOrNumber("1"),
  position: "absolute",
  display: "flex",
  width: stringOrNumber("10"),
  height: stringOrNumber("20"),
  backgroundColor: types.optional(Color, {}),
  fontFamily: `Work Sans`,
  fontSize: stringOrNumber("16"),
  fontWeight: stringOrNumber("400"),
  fontStyle: "normal",
  letterSpacing: stringOrNumber("0"),
  lineHeight: stringOrNumber("1"),
  color: types.optional(Color, { r: 0, g: 0, b: 0, a: 1 }),
  overflow: "visible",
  verticalAlign: "middle",
  textAlign: "left",
  justifyContent: "flex-start",
  isLoadingFont: false
}

const fixedNumberString = (options) => {
  const value = String(options.value)
  const minMaxed = options.minMax(value)
  const parsedFloat = Number.parseFloat(minMaxed)
  const toFixed = parsedFloat.toFixed(parsedFloat.length > 2 ? options.decimals : 0)
  return toFixed
}

const actions = (self) => {
  const leftMinMax = minMax(0, 2550)
  const topMinMax = minMax(0, 3300)
  const sizeMinMax = minMax(1, 3300)
  const opacityMinMax = minMax(0, 1)
  const fontSizeMinMax = minMax(1, 1000)

  const setTop = (value) => {
    // self.top = Number(Number.parseFloat(sizeMinMax(String(value)).toFixed(2)))
    self.top = fixedNumberString({
      value: value,
      minMax: topMinMax,
      decimals: 2
    })
  }

  const setLeft = (value) => {
    // self.left = Math.round(leftMinMax(Number(value)))
    self.left = fixedNumberString({
      value: value,
      minMax: leftMinMax,
      decimals: 2
    })
  }

  const setWidth = (value) => {
    // Number(Number.parseFloat(sizeMinMax(String(value)).toFixed(2)))
    self.width = fixedNumberString({
      value: value,
      minMax: sizeMinMax,
      decimals: 2
    })
  }
  const setHeight = (value) => {
    // (self.height = Number(Number.parseFloat(sizeMinMax(String(value)).toFixed(2))))
    self.height = fixedNumberString({
      value: value,
      minMax: sizeMinMax,
      decimals: 2
    })
  }

  const setOpacity = (value) => {
    // (self.opacity = Number(Number(Number.parseFloat(String(value)).toFixed(1))))
    self.opacity = fixedNumberString({
      value: value,
      minMax: opacityMinMax,
      decimals: 2
    })
  }

  const setBackgroundColor = (value) => (self.backgroundColor = value)
  const setColor = (value) => (self.color = value)

  const setFontSize = (value) => {
    self.fontsize = fixedNumberString({
      value: value,
      minMax: fontSizeMinMax,
      decimals: 1
    })
  }

  const setFontFamily = (value) => {
    self.fontFamily = value
    self.fontWeight = "400"
  }

  const setAlign = (value) => {
    self.textAlign = value
    value === "left" && (self.justifyContent = `flex-start`)
    value === "right" && (self.justifyContent = `flex-end`)
    value === "center" && (self.justifyContent = value)
  }

  const setFontWeight = (value) => (self.fontWeight = value)
  const setFontStyle = (value) => (self.fontStyle = value)
  const setLineHeight = (value) => (self.lineHeight = Number(value))
  const setLetterSpacing = (value) => (self.letterSpacing = Number(value))
  const setIsLoadingFont = (value) => (self.isLoadingFont = value)

  const afterCreate = () => {
    // const newTop = (self.top / 100) * 3300
    // const newLeft = (self.left / 100) * 2550
    // const newWidth = (self.width / 100) * 2550
    // const newHeight = (self.height / 100) * 3300
    // setTop(newTop)
    // setLeft(newLeft)
    // setWidth(newWidth)
    // setHeight(newHeight)
  }

  return {
    afterCreate,
    setTop,
    setLeft,
    setWidth,
    setHeight,
    setOpacity,
    setBackgroundColor,
    setAlign,
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
    get backgroundColorString() {
      const { r, g, b, a } = self.backgroundColor
      return `rgba(${r}, ${g}, ${b}, ${a})`
    },

    get layerStyles() {
      return {
        userSelect: "none",
        top: self.top + "px",
        left: self.left + "px",
        opacity: self.opacity,
        position: self.position,
        display: self.display,
        width: self.width + "px",
        height: self.height + "px",
        backgroundColor: self.backgroundColorString,
        fontFamily: self.fontFamily,
        fontSize: self.fontSize + "px",
        fontWeight: self.fontWeight,
        fontStyle: self.fontStyle,
        letterSpacing: self.letterSpacing + "px",
        lineHeight: self.lineHeight + "%",
        color: self.colorString,
        overflow: self.overflow,
        verticalAlign: self.verticalAlign,
        textAlign: self.textAlign,
        justifyContent: self.justifyContent
      }
    },

    get colorString() {
      const { r, g, b, a } = self.color
      return `rgba(${r}, ${g}, ${b}, ${a})`
    },

    get textStyles() {
      return {
        fontFamily: self.fontFamily,
        fontSize: self.fontSize + "em",
        fontWeight: self.fontWeight,
        fontStyle: self.fontStyle,
        letterSpacing: self.letterSpacing,
        lineHeight: self.lineHeight,
        color: self.colorString,
        overflow: "visible",
        verticalAlign: self.verticalAlign,
        textAlign: self.textAlign,
        justifyContent: self.justifyContent,
        cursor: "pointer",
        backgroundColor: self.backgroundColorString
      }
    }
  }
}

export default types
  .model("Style", model)
  .actions(actions)
  .views(views)
