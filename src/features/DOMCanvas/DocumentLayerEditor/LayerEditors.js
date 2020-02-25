import Store from "#state"
import { CapsText } from "#components/CapsText"
import { ColorPicker } from "#components/ColorPicker"
import { Unicon } from "#components/Icon"
import { Select } from "#components/Select"
import { TextInput } from "#components/TextInput"
import { fontsManager } from "#utilities/fontsManager"
import { withEventValue } from "#utilities/withEventValue"
import { Pane, SegmentedControl, Textarea } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import Spacer from "react-spacer"

const EditorSectionRow = (props) => {
  return (
    <>
      <Pane
        display='flex'
        flexWrap='nowrap'
        flexDirection='row'
        justifyContent='stretch'
        width='100%'
      >
        {props.children}
      </Pane>
      <Spacer height='8px' />
    </>
  )
}

const EditorSectionTitle = (props) => {
  return (
    <>
      <EditorSectionRow>
        <CapsText>{props.title}</CapsText>
      </EditorSectionRow>
    </>
  )
}

export const EditorSection = (props) => {
  return (
    <>
      <Pane display='flex' flexDirection='column'>
        <EditorSectionTitle title={props.title} />
        {props.children}
      </Pane>
      <Spacer shrink={0} height='8px' />
    </>
  )
}

EditorSection.Row = EditorSectionRow

export const VerticalPositionEditor = observer((props) => {
  return (
    <TextInput
      variant='minimal'
      placeholder='0px'
      value={props.layer.style.top}
      onChange={(event) => props.layer.style.setTop(event.target.value)}
      // iconName='arrow-down'
      icon='Y'
      iconHint='Y Position'
      type='number'
      tagText='px'
      step={1}
    />
  )
})

export const HorizontalPositionEditor = observer((props) => {
  return (
    <TextInput
      variant='minimal'
      placeholder='0px'
      value={props.layer.style.left}
      onChange={(event) => props.layer.style.setLeft(event.target.value)}
      // iconName='arrow-right'
      icon='X'
      iconHint='X Position'
      type='number'
      tagText='px'
    />
  )
})

export const WidthEditor = observer((props) => {
  return (
    <TextInput
      variant='minimal'
      placeholder='auto'
      value={props.layer.style.width}
      onChange={(event) => props.layer.style.setWidth(event.target.value)}
      // iconName='arrows-horizontal'
      iconHint='Width'
      icon='W'
      type='number'
      tagText='px'
      step={0.1}
    />
  )
})

export const HeightEditor = observer((props) => {
  // Only allow controlling height on box layers.
  const value = props.layer.type === "box" ? props.layer.style.height : " "

  return (
    <TextInput
      variant='minimal'
      isDisabled={props.layer.type !== "box"}
      placeholder='auto'
      // iconName='arrows-vertical'
      icon='H'
      iconHint='Height'
      type='number'
      tagText='px'
      value={value}
      onChange={(event) => props.layer.style.setHeight(event.target.value)}
      disabled={props.layer.type !== "box"}
    />
  )
})

export const OpacityEditor = observer((props) => {
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
      onChange={(event) => props.layer.style.setOpacity(event.target.value)}
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
      value={props.layer.style.textAlign}
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
          onChange={(event) => props.layer.setName(event.target.value)}
        />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const BackgroundColorEditor = observer((props) => {
  return (
    <ColorPicker
      label=''
      onChange={(rgb) => props.layer.style.setBackgroundColor(rgb)}
      currentColor={props.layer.style.backgroundColorString}
      layer={props.layer}
    />
  )
})

export const FontFamilyPicker = observer((props) => {
  return (
    <Select
      width='100%'
      onChange={(event) => props.layer.style.setFontFamily(event.target.value)}
      value={props.layer.style.fontFamily}
      options={fontsManager.fontNames}
    />
  )
})

export const FontWeightPicker = observer((props) => {
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
export const FontStylePicker = observer((props) => {
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

export const MeasurementsEditor = observer((props) => {
  return (
    <EditorSection title='Area, Size, Position'>
      <EditorSection.Row>
        <WidthEditor layer={props.layer} />
        <Spacer shrink={0} width='8px' />
        <HeightEditor layer={props.layer} />
        <Spacer shrink={0} width='8px' />
        <VerticalPositionEditor layer={props.layer} />
        <Spacer shrink={0} width='8px' />
        <HorizontalPositionEditor layer={props.layer} />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const ImageEditor = observer((props) => {
  const { layer } = props

  return (
    <EditorSection title='Image'>
      <EditorSection.Row>
        <OpacityEditor layer={props.layer} />
        {/* <Spacer shrink={0} width='12px' />
        <BackgroundColorEditor layer={props.layer} /> */}
      </EditorSection.Row>
    </EditorSection>
  )
})

export const TextLinkEditor = observer((props) => {
  return (
    <EditorSection title='Text Data Link'>
      <EditorSection.Row>
        <Select
          width='100%'
          onChange={(event) => props.layer.setTextDataLink(event.target.value)}
          value={props.layer.textDataLink}
          options={["", ...Store.projectDatasetColumnNames]}
        />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const ImageUrlLinkEditor = observer((props) => {
  return (
    <EditorSection title='Image URL Data Link'>
      <EditorSection.Row>
        <Select
          width='100%'
          onChange={(event) => props.layer.setImageUrlDataLink(event.target.value)}
          value={props.layer.imageUrlDataLink}
          options={["", ...Store.projectDatasetColumnNames]}
        />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const ImageRowUrlsSelector = observer((props) => {
  return (
    <EditorSection title='Image Row Data Link'>
      <EditorSection.Row>
        <Select
          width='100%'
          onChange={(event) => props.layer.setImageRowUrlsDataLink(event.target.value)}
          value={props.layer.imageRowUrlsDataLink}
          options={["", ...Store.projectDatasetColumnNames]}
        />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const BoxEditor = observer((props) => {
  const { layer } = props

  return (
    <EditorSection title='Box'>
      <EditorSection.Row>
        <OpacityEditor layer={props.layer} />
        <Spacer shrink={0} width='12px' />
        <BackgroundColorEditor layer={props.layer} />
      </EditorSection.Row>
    </EditorSection>
  )
})

export const FontEditor = observer((props) => {
  return (
    <EditorSection title='Font'>
      <EditorSection.Row>
        <FontFamilyPicker layer={props.layer} />
        <Spacer shrink={0} width='12px' />
        <ColorPicker
          label=''
          onChange={(rgb) => props.layer.style.setColor(rgb)}
          currentColor={props.layer.style.colorString}
          layer={props.layer}
        />
        <Spacer shrink={0} width='12px' />
        <BackgroundColorEditor layer={props.layer} />
      </EditorSection.Row>

      <EditorSection.Row>
        <TextInput
          variant='minimal'
          placeholder='24'
          value={props.layer.style.fontSize}
          onChange={(event) => {
            console.log("...event", typeof event.target.value)
            props.layer.style.setFontSize(Number(event.target.value))
          }}
          uniconName='text-size'
          iconHint='Font Size'
          type='number'
          tagText='pt'
          step={1}
        />
        <Spacer shrink={0} width='12px' />
        <TextInput
          variant='minimal'
          placeholder='100%'
          value={props.layer.style.lineHeight}
          onChange={withEventValue(props.layer.style.setLineHeight)}
          uniconName='line-spacing'
          iconHint='Line Height'
          type='number'
          tagText='%'
          step={0.1}
        />
        <Spacer shrink={0} width='12px' />
        <TextInput
          variant='minimal'
          placeholder='0px'
          value={props.layer.style.letterSpacing}
          onChange={withEventValue(props.layer.style.setLetterSpacing)}
          uniconName='shrink'
          iconHint='Letter Spacing'
          step={0.1}
          type='number'
          tagText='px'
        />
      </EditorSection.Row>

      <EditorSection.Row>
        <FontWeightPicker layer={props.layer} />
        <Spacer shrink={0} width='12px' />
        <FontStylePicker layer={props.layer} />
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
