import { Pane, Strong, TextInput } from "evergreen-ui"
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

export const BoxLayerEditor = observer((props) => {
  const { layer } = props

  return (
    <>
      <LayerRectEditor layer={layer} />

      <InputRow>
        <CapsText>Box</CapsText>
      </InputRow>

      <Spacer shrink={0} height='16px' />

      <InputRow>
        {/* <FontFamilyPicker layer={layer} /> */}
        {/* <Spacer shrink={0} width='12px' /> */}
        <ColorPicker
          label=''
          onChange={(rgb) => props.layer.style.setBackgroundColor(rgb)}
          currentColor={layer.style.rgbaBackgroundColorString}
          layer={layer}
        />
      </InputRow>
    </>
  )
})
