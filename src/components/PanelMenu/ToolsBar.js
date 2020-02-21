import { Pane } from "evergreen-ui"
import * as React from "react"
import Spacer from "react-spacer"
import styles from "./PanelMenu.module.css"

export const ToolBar = (props) => {
  return (
    <Pane className={styles.ToolBar}>
      <Spacer width='12px' />
      {props.children}
      <Spacer width='12px' />
    </Pane>
  )
}
