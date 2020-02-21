import * as React from "react"
import Store from "#state"
import { observer } from "mobx-react"

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
  // draggable: props.layer.isVisible && Store.isSelected(props.layer.id),
  // isSelected: props.layer.isVisible && Store.isSelected(props.layer.id),

  const style = {
    ...props.layer.style.documentLayerStyles,
    cursor: props.layer.isLocked ? "initial" : "pointer"
  }

  return (
    <img
      src={props.layer.image.fileUrl}
      data-layer-id={props.layer.id}
      data-layer-locked={props.layer.isLocked}
      data-selected-layer={Store.isSelected(props.layer.id)}
      style={style}
    />
  )
})

const TextLayer = observer((props) => {
  if (!props.layer.isVisible) return null
  // draggable: props.layer.isVisible && Store.isSelected(props.layer.id),
  // isSelected: props.layer.isVisible && Store.isSelected(props.layer.id),
  const style = {
    ...props.layer.style.documentLayerStyles,
    ...props.layer.style.textStyles
  }

  return (
    <p
      data-layer-id={props.layer.id}
      data-layer-locked={props.layer.isLocked}
      data-selected-layer={Store.isSelected(props.layer.id)}
      style={style}
    >
      {props.layer.text}
    </p>
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
      style={props.layer.style.documentLayerStyles}
    />
  )
})
