import ClickNHold from "react-click-n-hold"
import * as React from "react"
import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core"
import { observer, Observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc"
// import { Icon } from "../../../components/Icon"
import Spacer from "react-spacer"

import {
  Icon,
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

import Store from "../../../state"
import getValue from "get-value"
import classcat from "classcat"
import { observable } from "mobx"

import styles from "./LayersList.module.css"

export const LayerContainer = (props) => {
  console.log({ props })
  return (
    <Pane
      position='relative'
      display='flex'
      data-layer-id={props.layerId}
      className={props.className}
      index={props.index}
    >
      {props.children}
    </Pane>
  )
}

export const LayerName = (props) => {
  const containerClassName = classcat(["LayerNameContainer", styles.LayerNameContainer])
  const nameClassName = classcat(["LayerName", styles.LayerName])

  return (
    <Pane className={containerClassName} onClick={props.onClick} width='100%'>
      <Text color='inherit' className={nameClassName}>
        {props.name}
      </Text>
    </Pane>
  )
}

export const LayerActionIcons = (props) => {
  const className = classcat(["LayerActionIcons", styles.LayerActionIcons])
  const eyeIcon = props.isVisible ? "eye-open" : "eye-off"
  const eyeColor = props.isSelected ? "#fff" : "#293742"

  return (
    <Pane className={className}>
      <Pane width='32px' display='flex' justifyContent='center' alignItems='center'>
        <Icon icon={eyeIcon} size={16} color={eyeColor} onClick={props.toggleVisibility} />
      </Pane>
      <ClickNHold time={3} onStart={props.onStartDeleting} onClickNHold={props.onFinishDeleting}>
        <Pane width='32px' display='flex' justifyContent='center' alignItems='center'>
          <Choose>
            <When condition={props.isDeleting}>
              <Strong color='#EC4C47' height='16px' lineHeight='120%'>
                {props.secondsUntilDelete}
              </Strong>
            </When>
            <Otherwise>
              <Icon icon='trash' color={eyeColor} size={12} />
            </Otherwise>
          </Choose>
        </Pane>
      </ClickNHold>
    </Pane>
  )
}
