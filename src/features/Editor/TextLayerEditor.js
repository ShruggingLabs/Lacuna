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
// import { Select } from "@blueprintjs/select"
import { fontsManager } from "../../utilities/fontsManager"

import {
  Pane,
  Label,
  Textarea,
  TextInput,
  Text,
  Badge,
  Strong,
  Select,
  Popover,
  Position,
  Positioner,
  Tooltip,
  IconButton
} from "evergreen-ui"

import { ColorPicker } from "../../components/ColorPicker"

export const TextLayerEditor = observer((props) => {
  const { layer } = props

  return (
    <>
      <Spacer height='8px' />

      <InputRow>
        <Text>Size/Positioning</Text>
      </InputRow>

      <Spacer height='12px' />
      <InputRow>
        <MinimalInput
          placeholder='0px'
          value={layer.style.left}
          onChange={layer.style.setLeft}
          iconName='arrow-from-right'
          iconHint='X Position'
          type='number'
          tagText='px'
        />
        <Spacer width='24px' />
        <MinimalInput
          placeholder='0px'
          value={layer.style.top}
          onChange={layer.style.setTop}
          iconName='arrow-from-top'
          iconHint='Y Position'
          type='number'
          tagText='px'
        />
      </InputRow>

      <Spacer height='12px' />

      <InputRow>
        <MinimalInput
          placeholder='auto'
          value={layer.style.width}
          onChange={layer.style.setWidth}
          iconName='arrows-resize-h'
          iconHint='Width'
          type='number'
          tagText='px'
        />
        <Spacer width='24px' />
        <MinimalInput
          isDisabled
          placeholder='auto'
          value={" "}
          // onChange={layer.style.setHeight}
          iconName='arrows-resize-v'
          iconHint='Height'
          type='number'
          tagText='px'
        />
      </InputRow>

      <Spacer height='8px' />
      <Divider />
      <Spacer height='12px' />

      <InputRow>
        <Text>Text Formatting</Text>
      </InputRow>
      <Spacer height='12px' />
      <InputRow>
        <FontFamilyPicker layer={layer} />
      </InputRow>
      <Spacer height='12px' />
      <InputRow>
        <MinimalInput
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
        <MinimalInput
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
        <MinimalInput
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
      <Spacer height='12px' />
      <InputRow>
        <FontWeightPicker layer={layer} />
        <Spacer width='24px' />
        <FontStylePicker layer={layer} />
      </InputRow>

      <Spacer height='12px' />
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

      <Spacer height='8px' />
      <Divider />
      <Spacer height='12px' />

      <TextValueInput layer={layer} />
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

MinimalInput.defaultProps = {
  width: "100%",
  step: 1
}

const TextValueInput = observer((props) => {
  return (
    <Pane>
      <Label htmlFor='TextValueInput' marginBottom={4} display='block'>
        Text Value
      </Label>
      <Textarea
        value={props.layer.text}
        onChange={(e) => props.layer.setText(e)}
        id='TextValueInput'
        placeholder='Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
      />
    </Pane>
  )
})

const InputRow = (props) => {
  return <div className='inputRow'>{props.children}</div>
}

const FontFamilyPicker = observer((props) => {
  return (
    <Select
      width='100%'
      onChange={(event) => props.layer.style.setFontFamily(event.target.value)}
      value={props.layer.style.fontFamily}
    >
      <For each='fontName' of={fontsManager.fontNames}>
        <option value={fontName} key={fontName}>
          {fontName}
        </option>
      </For>
    </Select>
  )
})

const FontWeightPicker = observer((props) => {
  return (
    <Select
      width='100%'
      onChange={(event) => props.layer.style.setFontWeight(event.target.value)}
      value={props.layer.style.fontWeight}
    >
      <For each='fontWeight' of={fontsManager.getFontWeights(props.layer.style.fontFamily)}>
        <option value={fontWeight} key={fontWeight}>
          {fontWeight}
        </option>
      </For>
    </Select>
  )
})

// <Icon name='italic' style={{ fontSize: 22 }} /> {props.layer.style.fontStyle}
const FontStylePicker = observer((props) => {
  return (
    <Select
      width='100%'
      onChange={(event) => props.layer.style.setFontStyle(event.target.value)}
      value={props.layer.style.fontStyle}
    >
      <For
        each='fontStyle'
        of={fontsManager.getFontWeightStyles(
          props.layer.style.fontFamily,
          props.layer.style.fontWeight
        )}
      >
        <option value={fontStyle} key={fontStyle}>
          {fontStyle}
        </option>
      </For>
    </Select>
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
