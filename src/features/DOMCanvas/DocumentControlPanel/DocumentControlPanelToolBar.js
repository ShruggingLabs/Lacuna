import { Pane } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import { PanelMenu } from "#components/PanelMenu/PanelMenu"

import { Icon } from "#components/Icon"
import Store from "#state"
import styles from "./DocumentControlPanelToolBar.module.css"
import Spacer from "react-spacer"

export const DocumentControlPanelToolBar = observer((props) => {
  const documentZoomLevel = Store.documentZoomLevel

  return (
    <PanelMenu.ToolBar>
      <ActionIcon
        iconClassName={styles.icon}
        iconName='zoom-in'
        hint='Zoom In'
        onClick={() => Store.zoomInDocument()}
      />

      <Spacer width='12px' />

      <ActionIcon
        iconClassName={styles.icon}
        iconName='zoom-out'
        hint='Zoom Out'
        onClick={() => Store.zoomOutDocument()}
      />

      <Spacer width='12px' />

      <ActionIcon
        iconClassName={styles.icon}
        iconName='th'
        hint='Manage Dataset'
        onClick={() => Store.toggleDatasetManager()}
      />

      <Spacer width='12px' />

      <ActionIcon
        iconClassName={styles.icon}
        iconName='grid'
        hint='Toggle Grid'
        onClick={() => Store.toggleCanvasGrid()}
      />

      <Spacer width='12px' />

      <ActionIcon
        iconClassName={styles.icon}
        iconName='floppy-disk'
        hint='Save'
        onClick={() => Store.save()}
      />
    </PanelMenu.ToolBar>
  )
})

const ActionIcon = (props) => {
  return (
    <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
      <Icon
        iconSize='14px'
        className={props.iconClassName}
        icon={props.iconName}
        title={props.hint}
        htmlTitle={props.hint}
        onClick={props.onClick}
      />
    </Pane>
  )
}
