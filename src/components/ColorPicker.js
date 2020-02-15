import * as React from "react"
import { Classes, Menu, MenuDivider, MenuItem, Divider } from "@blueprintjs/core"
import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import classcat from "classcat"
import Spacer from "react-spacer"

import { ChromePicker } from "react-color"

import Store from "../state"
import { Icon } from "./Icon"
import { Input } from "./Input"

import { Button } from "@blueprintjs/core"
// import { Select } from "@blueprintjs/select"
import { fontsManager } from "../utilities/fontsManager"

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

export const ColorPicker = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const swatchStyle = {
    width: "36px",
    height: "14px",
    borderRadius: "2px",
    background: props.currentColor
  }

  return (
    <Pane>
      <Popover
        position={Position.BOTTOM_RIGHT}
        content={
          <Pane border='1px solid red'>
            <ChromePicker
              width={240}
              color={props.currentColor}
              onChange={(event) => props.onChange(event.rgb)}
            />
          </Pane>
        }
      >
        <Pane>
          <Button>
            <Pane display='flex' alignItems='center'>
              <Text size={300} marginRight={8}>
                {props.label}
              </Text>{" "}
              <Pane style={swatchStyle} />
            </Pane>
          </Button>
        </Pane>
      </Popover>
    </Pane>
  )
}
