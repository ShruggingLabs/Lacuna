import { Pane, Strong, TextInput, Text } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import Spacer from "react-spacer"
import { CapsText } from "../../components/CapsText"
import { ColorPicker } from "../../components/ColorPicker"
import { Icon } from "../../components/Icon"
import { LayerRectEditor } from "./LayerRectEditor"

const InputRow = (props) => {
  return (
    <Pane
      display='flex'
      flexWrap='nowrap'
      flexDirection='row'
      justifyContent='stretch'
      width='100%'
    >
      {props.children}
    </Pane>
  )
}

export const ImageLayerEditor = observer((props) => {
  const { layer } = props

  return (
    <>
      <LayerRectEditor layer={layer} />

      <InputRow>
        <CapsText>Image</CapsText>
      </InputRow>

      <Spacer shrink={0} height='16px' />

      <InputRow>
        <Text size={300}>...</Text>
        {/* <FontFamilyPicker layer={layer} /> */}
        {/* <Spacer shrink={0} width='12px' /> */}
        {/* <ColorPicker
          label=''
          onChange={(rgb) => props.layer.style.setColor(rgb)}
          currentColor={layer.style.rgbaColorString}
          layer={layer}
        /> */}
      </InputRow>
    </>
  )
})
