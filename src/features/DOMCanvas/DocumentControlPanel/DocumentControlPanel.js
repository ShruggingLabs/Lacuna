import { PanelMenu } from "#components/PanelMenu/PanelMenu"
import { observer } from "mobx-react"
import * as React from "react"
import { DocumentControlPanelToolBar } from "./DocumentControlPanelToolBar"
import Store from "#state"
import { Pane } from "evergreen-ui"

export const DocumentControlPanel = observer((props) => {
  return (
    <PanelMenu title='Document' titleIcon='document'>
      <DocumentControlPanelToolBar />
      <Row>Zoom: {Store.documentZoomLevel}</Row>
    </PanelMenu>
  )
})

export const Row = (props) => {
  return (
    <Pane
      position='relative'
      display='flex'
      backgroundColor='#fff'
      height={36}
      alignItems='center'
      paddingLeft='12px'
      paddingRight='12px'
    >
      {props.children}
    </Pane>
  )
}
