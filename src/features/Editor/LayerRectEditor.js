import * as React from "react"
import { Classes, Menu, MenuDivider, MenuItem, Divider } from "@blueprintjs/core"
import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import classcat from "classcat"
import Spacer from "react-spacer"

import { ChromePicker } from "react-color"

import Store from "../../state"
import { Icon } from "../../components/Icon"
import { Input } from "../../components/Input"

import { Button } from "@blueprintjs/core"
import { Select } from "../../components/Select"
import { fontsManager } from "../../utilities/fontsManager"

import {
  Pane,
  Label,
  Textarea,
  Text,
  Badge,
  Strong,
  Popover,
  Position,
  Positioner,
  Tooltip,
  IconButton
} from "evergreen-ui"

import { ColorPicker } from "../../components/ColorPicker"
import { CapsText } from "../../components/CapsText"
import { TextInput } from "../../components/TextInput"
import { withEventValue } from "./../../utilities/withEventValue"

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

export const LayerRectEditor = observer((props) => {
  const { layer } = props

  return (
    <>
      <Spacer shrink={0} height='12px' />

      <InputRow>
        <CapsText>Positioning</CapsText>
      </InputRow>

      <Spacer shrink={0} height='16px' />

      <InputRow>
        <TextInput
          placeholder='0px'
          value={layer.style.left}
          onChange={withEventValue(layer.style.setLeft)}
          iconName='arrow-from-right'
          iconHint='X Position'
          type='number'
          tagText='px'
        />
        <Spacer shrink={0} width='12px' />
        <TextInput
          placeholder='0px'
          value={layer.style.top}
          onChange={withEventValue(layer.style.setTop)}
          iconName='arrow-from-top'
          iconHint='Y Position'
          type='number'
          tagText='px'
        />
      </InputRow>

      <Spacer shrink={0} height='24px' />

      <InputRow>
        <CapsText>Size</CapsText>
      </InputRow>

      <Spacer shrink={0} height='16px' />

      <InputRow>
        <TextInput
          placeholder='auto'
          value={layer.style.width}
          onChange={withEventValue(layer.style.setWidth)}
          iconName='arrows-resize-h'
          iconHint='Width'
          type='number'
          tagText='px'
        />
        <Spacer shrink={0} width='12px' />
        <TextInput
          isDisabled
          placeholder='auto'
          iconName='arrows-resize-v'
          iconHint='Height'
          type='number'
          tagText='px'
          value={layer.type === "text" ? " " : layer.style.height}
          onChange={withEventValue(layer.style.setHeight)}
          disabled={layer.type === "text"}
        />
      </InputRow>

      <Spacer shrink={0} height='24px' />
    </>
  )
})
