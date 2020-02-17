import * as React from "react"

import classcat from "classcat"
import { InputTag, InputTagText } from "./InputTag"

import {
  Classes,
  EditableText,
  Menu,
  MenuDivider,
  MenuItem,
  Collapse,
  Popover,
  Position,
  Tooltip,
  InputGroup,
  Text,
  Tag,
  Label,
  FormGroup
} from "@blueprintjs/core"
import { Icon } from "./Icon"

const ID_TEXT_CLASSNAMES = classcat([Classes.TEXT_SMALL, Classes.TEXT_MUTED])

const getValue = (props) => {
  if (typeof props.value === "number") return props.value

  // NOTE: If they delete the value and props.value === '',
  // input will replace it with a 0. We want empty values a possibility.
  const cleanValue = props.value.replace("px", "").replace("%", "")
  const fixedValue = props.value !== "" ? Number(cleanValue) : " "
  return isNaN(fixedValue) ? " " : fixedValue
}

const Wrapper = (props) => {
  // TODO: UX error if no label and no icon.
  if (!props.label) return <NoLabelWrapper {...props} />
  return props.horizontal ? <HorizontalWrapper {...props} /> : <VerticalWrapper {...props} />
}

export const Input = (props) => {
  const value = getValue(props)
  const isLarge = props.size === "large"
  const isSmall = props.size === "small"

  return (
    <Wrapper label={props.label}>
      <InputGroup
        disabled={props.isDisabled}
        onChange={props.onChange}
        placeholder={props.placeholder}
        rightElement={<InputTagText {...props} />}
        small={isSmall}
        large={isLarge}
        value={value}
        type={props.type}
        leftIcon={<LabelIcon {...props} />}
        style={{
          paddingLeft: props.tagIcon ? 32 : 0
        }}
      />
    </Wrapper>
  )
}

Input.defaultProps = {
  size: "",
  isDisabled: false,
  value: " ",
  tagText: null,
  tagIcon: null,
  tagIconHint: null,
  type: "text"
}

const LabelIcon = (props) => {
  const style = {
    position: "absolute",
    left: 2,
    top: 1,
    zIndex: 10,
    fill: "#5C7080",
    fontSize: 20,
    height: "100%"
  }

  return <Icon icon={props.tagIcon} hint={props.tagIconHint} style={style} />
}

const VerticalWrapper = (props) => {
  return (
    <Label>
      <small>{props.label}</small>
      {props.children}
    </Label>
  )
}

const HorizontalWrapper = (props) => {
  return (
    <FormGroup inline label={<small>{props.label}</small>}>
      {props.children}
    </FormGroup>
  )
}

const NoLabelWrapper = (props) => {
  return <div style={{ display: "flex" }}>{props.children}</div>
}
