import { Heading, Pane } from "evergreen-ui"
import * as React from "react"
import Spacer from "react-spacer"
import { Icon } from "../../components/Icon"
import styles from "./PanelMenu.module.css"
import { ToolBar } from "./ToolsBar"

const PanelMenuTitle = (props) => {
  return (
    <Pane className={styles.PanelMenuTitleContainer}>
      <If condition={props.icon}>
        <Icon icon={props.icon} size='14px' color='var(--colorGrayscale5)' />
        <Spacer width='12px' />
      </If>
      <Heading size={400} color='var(--colorGrayscale1)' className={styles.PanelMenuTitle}>
        {props.title}
      </Heading>
    </Pane>
  )
}

// TODO: Make the container separate.
const PanelMenuContainer = (props) => {
  return (
    <Pane
      {...props}
      elevation={0}
      display='flex'
      background='#fff'
      flexDirection='column'
      className={styles.PanelMenuContainer}
    />
  )
}

export const PanelMenu = (props) => {
  return (
    <PanelMenuContainer>
      <PanelMenuTitle title={props.title} icon={props.titleIcon} />
      {props.children}
    </PanelMenuContainer>
  )
}

PanelMenu.ToolBar = ToolBar
