import ClickNHold from "react-click-n-hold"
import * as React from "react"
import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core"
import { observer, Observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc"
import { Icon } from "../../components/Icon"
import Spacer from "react-spacer"

import {
  Icon as EIcon,
  Pane,
  Label,
  Textarea,
  TextInput,
  Text,
  Badge,
  Strong,
  Select,
  Popover,
  Position,
  Positioner,
  Tooltip,
  IconButton,
  Pill,
  Spinner,
  Card,
  Heading
} from "evergreen-ui"

import Store from "../../state"
import getValue from "get-value"
import classcat from "classcat"
import { observable } from "mobx"

import styles from "./PanelMenu.module.css"

const PanelMenuTitle = (props) => {
  return (
    <Pane className={styles.PanelMenuTitleContainer}>
      <If condition={props.icon}>
        <Icon.Evergreen icon={props.icon} size='14px' color='var(--colorGrayscale5)' />
        <Spacer width='12px' />
      </If>
      <Heading size={400} color='var(--colorGrayscale12)' className={styles.PanelMenuTitle}>
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
      <div className={styles.divider} />
      {props.children}
    </PanelMenuContainer>
  )
}
