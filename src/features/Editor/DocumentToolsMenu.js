import * as React from "react"
import { Classes, Icon, Menu, MenuDivider, MenuItem, Collapse } from "@blueprintjs/core"
import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"

export const DocumentToolsMenu = observer((props) => {
  const store = useStore()

  return (
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem tagName='p' className='MenuTitle' text='Tools' />
      <MenuDivider />
      <MenuItem icon='paragraph' text='Add Text Layer' onClick={store.addTextLayer} />
      <MenuItem icon='widget' text='Add Box Layer' onClick={store.addBoxLayer} />
      <MenuItem disabled icon='media' text='Add Image Layer' onClick={store.addImageLayer} />
    </Menu>
  )
})
