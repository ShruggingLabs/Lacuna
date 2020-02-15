import * as React from "react"
import { Classes, Menu, MenuDivider, MenuItem, Text, Divider } from "@blueprintjs/core"
import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import classcat from "classcat"
import Spacer from "react-spacer"
import Store from "../../state"
import { Icon } from "../../components/Icon"
import { Input } from "../../components/Input"
import { Button } from "@blueprintjs/core"
import { Pane, Label, Textarea, TextInput, Badge, Strong, Select } from "evergreen-ui"
import { ColorPicker } from "../../components/ColorPicker"

const InputRow = (props) => {
  return <div className='inputRow'>{props.children}</div>
}

export const BoxLayerEditor = observer((props) => {
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
          value={layer.style.height}
          onChange={layer.style.setHeight}
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
        <Text>Additional Options</Text>
      </InputRow>
      <Spacer height='12px' />
      <InputRow></InputRow>
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
          type='number'
          tagText='px'
        />
      </InputRow>
      <Spacer height='12px' />
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
