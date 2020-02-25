import * as React from "react"
import Store from "#state"
import { observer } from "mobx-react"
import Draggable from "react-draggable"

export const DocumentLayers = observer((props) => {
  return (
    <>
      <For each='layer' of={Store.layers}>
        <Choose>
          <When condition={layer.type === "image"}>
            <ImageLayer layer={layer} key={layer.id} />
          </When>
          <When condition={layer.type === "text"}>
            <TextLayer layer={layer} key={layer.id} />
          </When>
          <When condition={layer.type === "box"}>
            <BoxLayer layer={layer} key={layer.id} />
          </When>
        </Choose>
      </For>
    </>
  )
})

const ImageLayer = observer((props) => {
  if (!props.layer.isVisible) return null
  const isSelected = Store.isSelected(props.layer.id)

  const style = {
    ...props.layer.style.layerStyles,
    cursor: props.layer.isLocked ? "initial" : "pointer"
  }

  const src = props.layer.imageUrlDataLink
    ? Store.getDemoDataRow()[props.layer.imageUrlDataLink]
    : props.layer.image.fileUrl

  const onDragEnd = (event, data) => {
    props.layer.style.setTop(data.node.offsetTop)
    props.layer.style.setLeft(data.node.offsetLeft)
  }

  return (
    <Draggable disabled={!isSelected} scale={Store.documentZoomLevel} onStop={onDragEnd}>
      <img
        // image layer
        draggable={false}
        src={src}
        data-layer-id={props.layer.id}
        data-layer-locked={props.layer.isLocked}
        data-selected-layer={isSelected}
        style={style}
      />
    </Draggable>
  )
})

const TextLayer = observer((props) => {
  if (!props.layer.isVisible) return null
  const isSelected = Store.isSelected(props.layer.id)

  const style = {
    ...props.layer.style.layerStyles,
    cursor: props.layer.isLocked ? "initial" : "pointer"
  }

  const text = props.layer.textDataLink
    ? Store.getDemoDataRow()[props.layer.textDataLink]
    : props.layer.text

  const onDragEnd = (event, data) => {
    props.layer.style.setTop(data.node.offsetTop)
    props.layer.style.setLeft(data.node.offsetLeft)
  }

  return (
    <Draggable disabled={!isSelected} scale={Store.documentZoomLevel} onStop={onDragEnd}>
      <p
        data-layer-id={props.layer.id}
        data-layer-locked={props.layer.isLocked}
        data-selected-layer={Store.isSelected(props.layer.id)}
        style={style}
      >
        {text}
      </p>
    </Draggable>
  )
})

const BoxLayer = observer((props) => {
  if (!props.layer.isVisible) return null
  // draggable: props.layer.isVisible && Store.isSelected(props.layer.id),
  // isSelected: props.layer.isVisible && Store.isSelected(props.layer.id),

  return (
    <div
      data-layer-id={props.layer.id}
      data-layer-locked={props.layer.isLocked}
      data-selected-layer={Store.isSelected(props.layer.id)}
      style={props.layer.style.layerStyles}
    />
  )
})
