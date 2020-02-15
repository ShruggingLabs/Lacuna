import * as React from "react"

import classcat from "classcat"

import {
  Classes,
  EditableText,
  Icon,
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

const TEXT_CLASSNAMES = classcat([Classes.TEXT_SMALL, Classes.TEXT_MUTED])

export const InputTag = (props) => {
  if (props.tagText) {
    return <InputTagText tagText={props.tagText} />
  }

  if (props.tagIcon) {
    return <InputTagIcon tagIcon={props.tagIcon} />
  }

  return null
}

const InputTagIcon = (props) => {
  return (
    <span
      style={{
        width: "fit-content",
        padding: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: 2,
        marginRight: 4
      }}
    >
      {props.tagIcon}
    </span>
  )
}

InputTagIcon.defaultProps = {
  tagIcon: null
}

export const InputTagText = (props) => {
  return (
    <span
      style={{
        width: "fit-content",
        padding: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: 2,
        marginRight: 6
      }}
    >
      <Text className={TEXT_CLASSNAMES}>{props.tagText}</Text>
    </span>
  )
}

InputTagText.defaultProps = {
  tagText: ""
}
