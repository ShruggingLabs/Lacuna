import { Classes, MenuItem } from "@blueprintjs/core"
import classcat from "classcat"
import { Pane } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import { CapsText } from "../../components/CapsText"
import { PanelMenu } from "../../components/PanelMenu/PanelMenu"
import Store from "../../state"
import { BoxLayerEditor } from "./BoxLayerEditor"
import { TextLayerEditor } from "./TextLayerEditor"
import { useKey, useKeyPressEvent } from "react-use"
import { ImageLayerEditor } from "./ImageLayerEditor"

export const LayerEditorMenu = observer((props) => {
  const selectedLayer = Store.mainSelectedLayer
  const isDeleted = selectedLayer?.isDeleted

  return (
    <PanelMenu title='Layer Editor' titleIcon='layer'>
      {!selectedLayer && NoLayerSelectedText}
      {selectedLayer && !isDeleted && <LayerEditor layer={selectedLayer} />}
    </PanelMenu>
  )
})

const isAnInputFocused = () => {
  return document.querySelector("input:focus")
}

const LayerEditor = (props) => {
  const { layer } = props

  useKey("ArrowLeft", (event) => {
    if (isAnInputFocused()) return
    const newValue = event.shiftKey ? layer.style.left - 10 : layer.style.left - 1
    layer.style.setLeft(newValue)
  })

  useKey("ArrowRight", (event) => {
    if (isAnInputFocused()) return
    const newValue = event.shiftKey ? layer.style.left + 10 : layer.style.left + 1
    layer.style.setLeft(newValue)
  })

  useKey("ArrowUp", (event) => {
    if (isAnInputFocused()) return
    const newValue = event.shiftKey ? layer.style.top - 10 : layer.style.top - 1
    layer.style.setTop(newValue)
  })

  useKey("ArrowDown", (event) => {
    if (isAnInputFocused()) return
    const newValue = event.shiftKey ? layer.style.top + 10 : layer.style.top + 1
    layer.style.setTop(newValue)
  })

  useKey("Delete", (event) => {
    console.log("delete...", event.key)
    if (isAnInputFocused()) return
    layer.trash()
  })

  return (
    <div className='LayerEditor'>
      <Choose>
        <When condition={layer.type === "text"}>
          <TextLayerEditor layer={layer} />
        </When>
        <When condition={layer.type === "box"}>
          <BoxLayerEditor layer={layer} />
        </When>
        <When condition={layer.type === "image"}>
          <ImageLayerEditor layer={layer} />
        </When>
      </Choose>
    </div>
  )
}

const NoLayerSelectedText = (
  <div style={{ padding: 8, paddingBottom: 0 }}>
    <p className={Classes.TEXT_MUTED}>No layer selected.</p>
  </div>
)
