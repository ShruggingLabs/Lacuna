import classcat from "classcat"
import { Icon, Pane, Strong, Text } from "evergreen-ui"
import * as React from "react"
import ClickNHold from "react-click-n-hold"
import styles from "./LayersList.module.css"
import { Unicon } from "../../../components/Icon"

export const LayerContainer = (props) => {
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

  const nameClassName = classcat([
    "LayerName",
    styles.LayerName,
    props.isSelected && styles.isSelectedLayerName
  ])

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
  const lockIcon = props.isLocked ? "lock" : "unlock"

  return (
    <Pane className={className}>
      <Pane width='28px' display='flex' justifyContent='center' alignItems='center'>
        <Icon icon={eyeIcon} size={16} color='var(--gray5)' onClick={props.toggleVisibility} />
      </Pane>
      <Pane
        width='28px'
        height='16px'
        marginRight={8}
        marginBottom={1}
        paddingBottom={1}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Icon icon={lockIcon} color='var(--gray5)' size={15} onClick={props.toggleIsLocked} />
      </Pane>
    </Pane>
  )
}
