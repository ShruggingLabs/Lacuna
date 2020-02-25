import { Pane, Strong, TextInput, Text } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import Spacer from "react-spacer"
import { CapsText } from "#components/CapsText"
import { ColorPicker } from "#components/ColorPicker"
import { Icon } from "#components/Icon"
import {
  MeasurementsEditor,
  LayerNameEditor,
  ImageEditor,
  ImageUrlLinkEditor,
  ImageRowUrlsSelector
} from "./LayerEditors"

export const ImageRowLayerEditor = observer((props) => {
  const { layer } = props

  return (
    <>
      <Spacer shrink={0} height='8px' />
      <LayerNameEditor layer={layer} />
      <MeasurementsEditor layer={layer} />
      <ImageRowUrlsSelector layer={layer} />
      {/* TODO: justify and alignment */}
    </>
  )
})
