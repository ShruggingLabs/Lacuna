import React from "react"

import {
  Classes,
  EditableText,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Collapse
} from "@blueprintjs/core"

import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"

import { TextLayer } from "./TextLayer"
import { LayerHandles, LayerOverlay } from "../../components/ReactHandles"

import "./Canvas.css"

export const Canvas = observer((props) => {
  const store = useStore()

  return (
    <div className='Canvas' id='Canvas'>
      {store.layers.map((layer) => {
        switch (layer.type) {
          case "text":
            return (
              <TextLayer key={layer.id} layer={layer} isSelected={store.isSelected(layer.id)} />
            )
          case "image":
            return (
              <TextLayer key={layer.id} layer={layer} isSelected={store.isSelected(layer.id)} />
            )
          case "box":
            return (
              <TextLayer key={layer.id} layer={layer} isSelected={store.isSelected(layer.id)} />
            )
        }
      })}
    </div>
  )
})
