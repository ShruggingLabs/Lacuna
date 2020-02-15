import React from "react"

import {
  Classes,
  EditableText,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Collapse
} from "@blueprintjs/core"

import { LeftMenuColumn } from "./LeftMenuColumn"
import { LayerEditorMenu } from "./LayerEditorMenu"
import { layersStore } from "./LayersStore"
import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"

export const CanvasArea = (props) => {
  return (
    <div className='CanvasArea'>
      <LeftMenuColumn />
      <Canvas />
      <CanvasControlPanel />
    </div>
  )
}

const CanvasControlPanel = (props) => {
  return (
    <div className='CanvasControlPanel'>
      <LayerEditorMenu />
    </div>
  )
}

const Canvas = observer((props) => {
  const store = useStore()

  return (
    <div className='Canvas'>
      {store.layers.map((layer) => {
        switch (layer.type) {
          case "text":
            return <TextLayer key={layer.id} layer={layer} />
          case "image":
            return <TextLayer key={layer.id} layer={layer} />
          case "box":
            return <TextLayer key={layer.id} layer={layer} />
        }
      })}
    </div>
  )
})

const TextLayer = observer((props) => {
  const style = props.layer.style

  return (
    <div style={{ width: style.width }}>
      <EditableText
        disabled={!props.layer.isEditing}
        isEditing={props.layer.isEditing}
        key={props.layer.id}
        confirmOnEnterKey={false}
        multiline={true}
        minWidth={style.width}
        value={props.layer.text}
        onChange={(value) => (props.layer.text = value)}
      />
    </div>
  )
})
