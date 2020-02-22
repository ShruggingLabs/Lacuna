import { Pane, Strong, Textarea } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import Spacer from "react-spacer"
import { CapsText } from "#components/CapsText"
import { ColorPicker } from "#components/ColorPicker"
import { Icon } from "#components/Icon"
import { Select } from "#components/Select"
import { TextInput } from "#components/TextInput"
import { fontsManager } from "#utilities/fontsManager"
import { withEventValue } from "#utilities/withEventValue"
import { MeasurementsEditor, LayerNameEditor, FontEditor, TextEditor } from "./LayerEditors"

export const CoreLayerEditor = (props) => {
  return (
    <>
      <Spacer height='8px' />
      <LayerNameEditor layer={props.layer} />
      <MeasurementsEditor layer={props.layer} />
      {props.children}
    </>
  )
}
