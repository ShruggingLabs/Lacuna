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

export const TextLayerEditor = observer((props) => {
  const { layer } = props

  return (
    <>
      <Spacer height='12px' />

      <InputRow>
        <CapsText>Positioning</CapsText>
      </InputRow>

      <Spacer height='16px' />

      <InputRow>
        <TextInput
          placeholder='0px'
          value={layer.style.left}
          onChange={layer.style.setLeft}
          iconName='arrow-from-right'
          iconHint='X Position'
          type='number'
          tagText='px'
        />
        <Spacer width='24px' />
        <TextInput
          placeholder='0px'
          value={layer.style.top}
          onChange={layer.style.setTop}
          iconName='arrow-from-top'
          iconHint='Y Position'
          type='number'
          tagText='px'
        />
      </InputRow>

      <Spacer height='24px' />

      <InputRow>
        <CapsText>Size</CapsText>
      </InputRow>

      <Spacer height='16px' />

      <InputRow>
        <TextInput
          placeholder='auto'
          value={layer.style.width}
          onChange={layer.style.setWidth}
          iconName='arrows-resize-h'
          iconHint='Width'
          type='number'
          tagText='px'
        />
        <Spacer width='24px' />
        <TextInput
          isDisabled
          placeholder='auto'
          value={" "}
          iconName='arrows-resize-v'
          iconHint='Height'
          type='number'
          tagText='px'
          disabled
        />
      </InputRow>

      <Spacer height='24px' />

      <InputRow>
        <CapsText>Font</CapsText>
      </InputRow>

      <Spacer height='16px' />

      <InputRow>
        <FontFamilyPicker layer={layer} />
      </InputRow>
      <Spacer height='16px' />
      <InputRow>
        <TextInput
          // size='small'
          placeholder='16px'
          value={layer.style.fontSize}
          onChange={layer.style.setFontSize}
          iconName='text-size'
          iconHint='Font Size'
          type='number'
          tagText='px'
        />
        <Spacer width='24px' />
        <TextInput
          // size='small'
          // label='Line Height'
          placeholder='100%'
          value={layer.style.lineHeight}
          onChange={layer.style.setLineHeight}
          iconName='line-spacing'
          iconHint='Line Height'
          type='number'
          tagText='x'
          step={0.1}
        />
        <Spacer width='24px' />
        <TextInput
          placeholder='0px'
          value={layer.style.letterSpacing}
          onChange={layer.style.setLetterSpacing}
          iconName='arrows-h-alt'
          iconHint='Letter Spacing'
          step={0.1}
          type='number'
          tagText='px'
        />
      </InputRow>
      <Spacer height='16px' />
      <InputRow>
        <FontWeightPicker layer={layer} />
        <Spacer width='24px' />
        <FontStylePicker layer={layer} />
      </InputRow>

      <Spacer height='16px' />
      <InputRow>
        <ColorPicker
          label='Color'
          onChange={(rgb) => props.layer.style.setColor(rgb)}
          currentColor={layer.style.rgbaColorString}
          layer={layer}
        />
        <Spacer width='24px' />
        <ColorPicker
          label='Background'
          onChange={(rgb) => props.layer.style.setBackgroundColor(rgb)}
          currentColor={layer.style.rgbaBackgroundColorString}
          layer={layer}
        />
      </InputRow>

      <Spacer height='24px' />

      <InputRow>
        <CapsText size={300}>Text</CapsText>
      </InputRow>

      <Spacer height='12px' />

      <InputRow>
        <TextValueInput layer={layer} />
      </InputRow>
    </>
  )
})

const MinimalInput = (props) => {
  const style = {
    position: "absolute",
    left: 2,
    top: 2,
    zIndex: 10,
    fontSize: 20,
    height: "100%"
  }

  return (
    <div className='MinimalInput' title={props.iconHint} style={{ width: props.width || "100%" }}>
      <TextInput {...props} />
      <Choose>
        <When condition={props.iconName}>
          <Icon name={props.iconName} hint={props.iconHint} style={style} />
        </When>
        {/* <When condition={props.icon}>
      <Icon name={props.tagIcon} hint={props.tagIconHint} style={style} />
    </When> */}
      </Choose>
      <If condition={props.tagText}>
        <Strong className='tagText' color=''>
          {props.tagText}
        </Strong>
      </If>
    </div>
  )
}

const TextValueInput = observer((props) => {
  return (
    <Textarea
      value={props.layer.text}
      onChange={(e) => props.layer.setText(e)}
      id='TextValueInput'
      placeholder='Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
    />
  )
})

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

const FontFamilyPicker = observer((props) => {
  return (
    <Select
      width='100%'
      onChange={(event) => props.layer.style.setFontFamily(event.target.value)}
      value={props.layer.style.fontFamily}
      options={fontsManager.fontNames}
    />
  )
})

const FontWeightPicker = observer((props) => {
  return (
    <Select
      width='100%'
      onChange={(event) => props.layer.style.setFontWeight(event.target.value)}
      value={props.layer.style.fontWeight}
      options={fontsManager.getFontWeights(props.layer.style.fontFamily)}
    />
  )
})

// <Icon name='italic' style={{ fontSize: 22 }} /> {props.layer.style.fontStyle}
const FontStylePicker = observer((props) => {
  const options = fontsManager.getFontWeightStyles(
    props.layer.style.fontFamily,
    props.layer.style.fontWeight
  )

  return (
    <Select
      width='100%'
      onChange={(event) => props.layer.style.setFontStyle(event.target.value)}
      value={props.layer.style.fontStyle}
      options={options}
    />
  )
})

// const renderSelectItem = (width) => (item, { handleClick, modifiers }) => {
//   return (
//     <MenuItem
//       text={item}
//       style={{ width }}
//       active={modifiers.active}
//       key={item}
//       // label={item}
//       onClick={handleClick}
//     />
//   )
// }
