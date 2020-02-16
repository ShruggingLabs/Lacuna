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

export const LayerEditorMenu = observer((props) => {
  return (
    <PanelMenu title='Layer Editor'>
      {!Store.mainSelectedLayer && NoLayerSelectedText}
      {Store.mainSelectedLayer && <LayerEditor />}
    </PanelMenu>
  )
})

const LayerEditor = observer((props) => {
  const layer = Store.mainSelectedLayer

  useKey("ArrowLeft", (event) => {
    const newValue = event.shiftKey ? layer.style.left - 10 : layer.style.left - 1
    layer.style.setLeft(newValue)
  })

  useKey("ArrowRight", (event) => {
    const newValue = event.shiftKey ? layer.style.left + 10 : layer.style.left + 1
    layer.style.setLeft(newValue)
  })

  useKey("ArrowUp", (event) => {
    const newValue = event.shiftKey ? layer.style.top - 10 : layer.style.top - 1
    layer.style.setTop(newValue)
  })

  useKey("ArrowDown", (event) => {
    const newValue = event.shiftKey ? layer.style.top + 10 : layer.style.top + 1
    layer.style.setTop(newValue)
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
      </Choose>
    </div>
  )
})

const NoLayerSelectedText = (
  <div style={{ padding: 8, paddingBottom: 0 }}>
    <p className={Classes.TEXT_MUTED}>No layer selected.</p>
  </div>
)

const ID_TEXT_CLASSNAMES = classcat([
  "uppercaseText",
  Classes.TEXT_OVERFLOW_ELLIPSIS,
  Classes.TEXT_SMALL,
  Classes.TEXT_MUTED
])

const MenuTitle = (props) => {
  const text = (
    <Pane style={{ display: "flex", justifyContent: "space-between" }}>
      <CapsText size={400}></CapsText>
    </Pane>
  )

  return <MenuItem tagName='p' className='MenuTitle' text={text} />
}
