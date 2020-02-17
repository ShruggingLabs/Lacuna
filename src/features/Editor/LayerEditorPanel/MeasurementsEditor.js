import { Text, Textarea, SegmentedControl } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import Spacer from "react-spacer"
import { CapsText } from "../../../components/CapsText"
import { ColorPicker } from "../../../components/ColorPicker"
import { TextInput } from "../../../components/TextInput"
import { withEventValue } from "../../../utilities/withEventValue"
import { EditorSection } from "./EditorSection"
import { fontsManager } from "../../../utilities/fontsManager"
import { Select } from "../../../components/Select"
import { Unicon } from "../../../components/Icon"

export const MeasurementsEditor = observer((props) => {
  const { layer } = props
  return (
    <EditorSection title='Measurements'>
      <EditorSection.Row>
        <TextInput
          variant='minimal'
          placeholder='0px'
          value={layer.style.left}
          onChange={withEventValue(layer.style.setLeft)}
          iconName='arrow-right'
          iconHint='X Position'
          type='number'
          tagText='px'
        />
        <Spacer shrink={0} width='8px' />
        <TextInput
          variant='minimal'
          placeholder='0px'
          value={layer.style.top}
          onChange={withEventValue(layer.style.setTop)}
          iconName='arrow-down'
          iconHint='Y Position'
          type='number'
          tagText='px'
        />
        <Spacer shrink={0} width='8px' />
        <TextInput
          variant='minimal'
          placeholder='auto'
          value={layer.style.width}
          onChange={withEventValue(layer.style.setWidth)}
          iconName='arrows-horizontal'
          iconHint='Width'
          type='number'
          tagText='px'
        />
        <Spacer shrink={0} width='8px' />
        <TextInput
          variant='minimal'
          isDisabled
          placeholder='auto'
          iconName='arrows-vertical'
          iconHint='Height'
          type='number'
          tagText='px'
          value={layer.type === "text" ? " " : layer.style.height}
          onChange={withEventValue(layer.style.setHeight)}
          disabled={layer.type === "text"}
        />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const OpacityController = observer((props) => {
  return (
    <TextInput
      variant='minimal'
      placeholder='1'
      iconName='eye-open'
      iconHint='Opacity'
      type='number'
      step={0.1}
      max={1}
      min={0}
      value={props.layer.style.opacity}
      onChange={withEventValue(props.layer.style.setOpacity)}
    />
  )
})

const ALIGNMENT_OPTIONS = [
  { label: <Unicon name='align-left' size='16px' />, value: "left" },
  { label: <Unicon name='align-center' size='16px' />, value: "center" },
  { label: <Unicon name='align-right' size='16px' />, value: "right" }
]

export const AlignmentEditor = observer((props) => {
  return (
    <SegmentedControl
      name='switch'
      width={90}
      height={24}
      options={ALIGNMENT_OPTIONS}
      value={props.layer.style.align}
      onChange={(value) => props.layer.style.setAlign(value)}
    />
  )
})

export const LayerNameEditor = observer((props) => {
  return (
    <EditorSection title='Layer Name'>
      <EditorSection.Row>
        <TextInput
          textAlign='left'
          variant='minimal'
          placeholder='layer name'
          iconName='barcode'
          iconHint='layer name'
          type='text'
          value={props.layer.name}
          onChange={props.layer.setName}
        />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const ImageEditor = observer((props) => {
  const { layer } = props

  return (
    <EditorSection title='Image'>
      <EditorSection.Row>
        <OpacityController layer={props.layer} />
        {/* <Spacer shrink={0} width='12px' />
        <BackgroundColorEditor layer={props.layer} /> */}
      </EditorSection.Row>
    </EditorSection>
  )
})

const BackgroundColorEditor = observer((props) => {
  return (
    <ColorPicker
      label=''
      onChange={(rgb) => props.layer.style.setBackgroundColor(rgb)}
      currentColor={props.layer.style.rgbaBackgroundColorString}
      layer={props.layer}
    />
  )
})

export const BoxEditor = observer((props) => {
  const { layer } = props

  return (
    <EditorSection title='Box'>
      <EditorSection.Row>
        <OpacityController layer={props.layer} />
        <Spacer shrink={0} width='12px' />
        <BackgroundColorEditor layer={props.layer} />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const FontEditor = observer((props) => {
  const { layer } = props
  console.log({ layer, fontsManager })

  return (
    <EditorSection title='Font'>
      <EditorSection.Row>
        <FontFamilyPicker layer={layer} />
        <Spacer shrink={0} width='12px' />
        <ColorPicker
          label=''
          onChange={(rgb) => props.layer.style.setColor(rgb)}
          currentColor={layer.style.rgbaColorString}
          layer={layer}
        />
      </EditorSection.Row>

      <EditorSection.Row>
        <TextInput
          variant='minimal'
          placeholder='16px'
          value={layer.style.fontSize}
          onChange={withEventValue(layer.style.setFontSize)}
          uniconName='text-size'
          iconHint='Font Size'
          type='number'
          tagText='px'
        />
        <Spacer shrink={0} width='12px' />
        <TextInput
          variant='minimal'
          placeholder='100%'
          value={layer.style.lineHeight}
          onChange={withEventValue(layer.style.setLineHeight)}
          uniconName='line-spacing'
          iconHint='Line Height'
          type='number'
          tagText='x'
          step={0.1}
        />
        <Spacer shrink={0} width='12px' />
        <TextInput
          variant='minimal'
          placeholder='0px'
          value={layer.style.letterSpacing}
          onChange={withEventValue(layer.style.setLetterSpacing)}
          uniconName='shrink'
          iconHint='Letter Spacing'
          step={0.1}
          type='number'
          tagText='px'
        />
      </EditorSection.Row>

      <EditorSection.Row>
        <FontWeightPicker layer={layer} />
        <Spacer shrink={0} width='12px' />
        <FontStylePicker layer={layer} />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const TextEditor = observer((props) => {
  return (
    <EditorSection title='Text'>
      <EditorSection.Row>
        <AlignmentEditor layer={props.layer} />
      </EditorSection.Row>
      <EditorSection.Row>
        <Textarea
          value={props.layer.text}
          onChange={(e) => props.layer.setText(e)}
          id='TextValueInput'
          placeholder='Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
        />
      </EditorSection.Row>
    </EditorSection>
  )
})

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
