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
import {
  MeasurementsEditor,
  LayerNameEditor,
  FontEditor,
  TextEditor,
  TextLinkEditor
} from "./LayerEditors"

export const TextLayerEditor = observer((props) => {
  const { layer } = props

  return (
    <>
      <Spacer shrink={0} height='8px' />
      <LayerNameEditor layer={layer} />
      <MeasurementsEditor layer={layer} />
      <FontEditor layer={layer} />
      <TextEditor layer={layer} />
      <TextLinkEditor layer={layer} />
    </>
  )
})
