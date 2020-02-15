import React from "react"

import {
  Classes,
  EditableText,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Collapse,
  Popover,
  Position,
  Tooltip
} from "@blueprintjs/core"

import OutsideClickHandler from "react-outside-click-handler"

import Store from "../../state"

import classcat from "classcat"
import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import { useWhyDidYouUpdate } from "use-why-did-you-update"
import { LayerHandles, LayerOverlay } from "../../components/ReactHandles"

import Spacer from "react-spacer"

import { Intent } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import "./TextLayer.css"
import { onElementChange } from "../../utilities/onElementChange"

const useState = (props) => {
  const parentSelector = `[data-layer-id="${props.layer.id}"]`
  const bordersSelector = `[data-layer-id="${props.layer.id}"] .bp3-editable-text`
  const editableContentSelector = `[data-layer-id="${props.layer.id}"] .bp3-editable-text-content`
  const textareaSelector = `[data-layer-id="${props.layer.id}"] .bp3-editable-text-input`
  const [isHovered, setIsHovered] = React.useState(false)

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false)
  const [selectedTargetSelector, setSelectedTargetSelector] = React.useState()

  const toggleBorders = (value = !isHovered) => setIsHovered(value)
  const selectLayer = () => Store.selectLayer(props.layer)
  const deselectLayer = () => Store.deselectLayer()

  const openTooltip = React.useCallback(() => setIsTooltipOpen(true), [])
  const closeTooltip = React.useCallback(() => setIsTooltipOpen(false), [])

  const onMouseEnter = React.useCallback(() => {
    setIsHovered(true)
  }, [])

  const onMouseLeave = React.useCallback(() => {
    setIsHovered(false)
  }, [props.isSelected])

  const onClick = React.useCallback(() => {
    if (!props.isSelected) {
      openTooltip()
      selectLayer()
    }
  }, [props.isSelected])

  React.useEffect(() => {
    if (props.isSelected) {
      const canvasElement = document.getElementById("Canvas")

      const eventSelector = `[data-layer-id="${props.layer.id}"]`
      const tooltipSelector = `[data-layer-id-tooltip="${props.layer.id}"]`
      const element = document.querySelector(eventSelector)

      const outsideClickHandler = (event) => {
        const tooltipElement = document.querySelector(tooltipSelector)
        const tt = document.querySelector(".bp3-transition-container")
        const tooltipContainsTarget = tt && tt.contains(event.target)
        // const targetIsTooltip = event.target === tooltipElement
        // const tooltipContainsTarget = tooltipElement.contains(event.target)
        const elementContainsTarget = element.contains(event.target)
        const targetContainsElement = event.target.contains(element)
        const elementIsTarget = event.target === element

        if (!elementContainsTarget && !elementIsTarget && !tooltipContainsTarget) deselectLayer()
      }

      canvasElement.addEventListener("click", outsideClickHandler)
      return () => canvasElement.removeEventListener("click", outsideClickHandler)
    } else {
      setIsHovered(false)
      const element = document.querySelector(bordersSelector)

      const handler = (event) => {
        if (event.type === "mouseenter") {
          setIsHovered(true)
        }

        if (event.type === "mouseleave") {
          setIsHovered(false)
        }
      }

      element.addEventListener("mouseenter", handler)
      element.addEventListener("mouseleave", handler)

      return () => {
        element.removeEventListener("mouseenter", handler)
        element.removeEventListener("mouseleave", handler)
      }
    }
  }, [props.isSelected])

  React.useEffect(() => {
    const parent = document.querySelector(parentSelector)
    const guardian = document.querySelector(bordersSelector)
    const child =
      document.querySelector(editableContentSelector) || document.querySelector(textareaSelector)

    const handler = () => {
      const parent = document.querySelector(parentSelector)
      const guardian = document.querySelector(bordersSelector)
      const child =
        document.querySelector(editableContentSelector) ||
        document.querySelector(textareaSelector)

      const childHeight = child.style.height
      const parentHeight = parent.style.height
      const guardianHeight = guardian.style.height

      const childRect = child.getBoundingClientRect()
      const guardianRect = guardian.getBoundingClientRect()
      const parentRect = parent.getBoundingClientRect()

      child.style.height = childRect.height + "px"
      guardian.style.height = childRect.height + "px"
      props.layer.style.setHeight(childRect.height)
    }

    const disconnect0 = onElementChange(parent, handler)
    const disconnect1 = onElementChange(child, handler)

    setTimeout(() => {
      handler()
    }, 250)
  }, [])

  return {
    onClick,
    isHovered,
    bordersSelector,
    isTooltipOpen,
    openTooltip,
    closeTooltip,
    onMouseEnter,
    onMouseLeave,
    parentSelector
  }
}

// Wraps the canvas TextLayer and manages the LayerHandles.
// Keeps InnerTextLayer from re-rendering on hover/unhover.
export const TextLayer = observer((props) => {
  const { bordersSelector, parentSelector, isHovered, ...otherState } = useState(props)
  const isSelected = Store.isSelected(props.layer.id)
  const shouldShowBorders = isSelected || isHovered

  return (
    <>
      <InnerTextLayer {...otherState} isSelected={isSelected} layerId={props.layer.id} />
      {shouldShowBorders && (
        <LayerHandles selector={bordersSelector} parentSelector={parentSelector} hideCorners />
      )}
    </>
  )
})

const InnerTextLayer = observer((props) => {
  const layer = Store.layerById(props.layerId)
  const style = layer.style

  const onClick = () => {
    !props.isTooltipOpen && props.openTooltip()
    props.onClick()
  }

  return (
    <>
      <div
        className='TextLayer'
        data-layer-id={layer.id}
        style={{ ...layer.style, opacity: layer.isVisible ? style.opacity : 0 }}
        onClick={props.onClick}
      >
        <Popover
          fill
          isOpen={props.isHovered}
          content={<TextLayerSelectedOptions layer={layer} {...props} />}
          position={Position.BOTTOM}
          modifiers={{
            offset: {
              offset: "0px 4px"
            }
          }}
        >
          <EditableText
            maxLines={200}
            style={{ display: "stuff" }}
            disabled={!layer.isEditing}
            isEditing={layer.isEditing}
            key={layer.id}
            confirmOnEnterKey={false}
            multiline={true}
            minWidth={style.width}
            value={layer.text}
            onChange={layer.setText}
          />
        </Popover>
      </div>
    </>
  )
})

const TextLayerSelectedOptions = observer((props) => {
  const eyeIcon = props.layer.isVisible ? IconNames.EYE_OPEN : IconNames.EYE_OFF
  const eyeColor = props.layer.isVisible ? "#293742" : "#8A9BA8"

  const onEditClick = (event) => {
    event.stopPropagation()
    // props.closeTooltip()
    props.layer.toggleIsEditing()
  }

  const onEyeClick = (event) => {
    event.stopPropagation()
    // props.closeTooltip()
    props.layer.toggleIsVisible(!props.layer.isVisible)
  }

  const onTrashClick = (event) => {
    // NOTE: Stop clicks from propagating and trying to select
    // the layer in MST after it is removed.
    event.stopPropagation()
    props.closeTooltip()
    props.layer.remove()
  }

  return (
    <div
      style={{ display: "flex", padding: "5px 8px 4px" }}
      className='TextLayerSelectedOptions'
      data-layer-id-tooltip={props.layer.id}
    >
      <Icon icon={IconNames.EDIT} iconSize={Icon.SIZE_STANDARD} onClick={onEditClick} />
      <Spacer width='12px' />
      <Icon icon={eyeIcon} color={eyeColor} iconSize={Icon.SIZE_STANDARD} onClick={onEyeClick} />
      <Spacer width='12px' />
      <Icon icon={IconNames.TRASH} iconSize={Icon.SIZE_STANDARD} onClick={onTrashClick} />
    </div>
  )
})
