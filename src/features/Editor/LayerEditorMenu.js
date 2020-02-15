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

import { Text } from "evergreen-ui"

export const LayerEditorMenu = observer((props) => {
  return (
    <>
      <div className='LayerEditorMenu'>
        <Menu className={Classes.ELEVATION_1}>
          <MenuTitle />
          <MenuDivider />
          {!Store.mainSelectedLayer && NoLayerSelectedText}
          {Store.mainSelectedLayer && <LayerEditor />}
        </Menu>
      </div>
    </>
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

const CapsText = (props) => {
  return (
    <Text {...props} style={{ textTransform: "uppercase", letterSpacing: 3, fontWeight: 700 }} />
  )
}

const MenuTitle = (props) => {
  const layerName = Store.mainSelectedLayer?.name
  const nameText = <CapsText className={ID_TEXT_CLASSNAMES}>{layerName || ""}</CapsText>

  const text = (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      Layer Editor
      <Spacer width='24px' />
      {nameText}
    </div>
  )

  return <MenuItem tagName='p' className='MenuTitle' text={text} />
}
