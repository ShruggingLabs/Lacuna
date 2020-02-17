import { Button } from "@blueprintjs/core"
import { Pane, Popover, Position, Text } from "evergreen-ui"
import * as React from "react"
import { SketchPicker } from "react-color"

export const ColorPicker = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const swatchStyle = {
    width: "36px",
    height: "14px",
    borderRadius: "2px",
    background: props.currentColor,
    border: "1px solid var(--colorGrayscale3)"
  }

  return (
    <Pane>
      <Popover
        position={Position.BOTTOM_RIGHT}
        content={
          <Pane border='1px solid red'>
            <SketchPicker
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
              <If condition={props.label}>
                <Text size={300} marginRight={8}>
                  {props.label + " "}
                </Text>
              </If>
              <Pane style={swatchStyle} />
            </Pane>
          </Button>
        </Pane>
      </Popover>
    </Pane>
  )
}
