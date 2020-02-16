import * as React from "react"
import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core"
import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import classcat from "classcat"
import Spacer from "react-spacer"

import Store from "../../state"
import { FontSize, LineHeight } from "../../components/CustomIcons"
import { Icon } from "../../components/Icon"
import { Input } from "../../components/Input"
import { TextLayerEditor } from "./TextLayerEditor"
import { BoxLayerEditor } from "./BoxLayerEditor"

import { CapsText } from "../../components/CapsText"
import { Pane } from "evergreen-ui"
import { PanelMenu } from "../../components/PanelMenu/PanelMenu"

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
