import { observer } from "mobx-react"
import * as React from "react"
import UseKey from "react-use/lib/comps/UseKey"
import Store from "#state"
import { toJS } from "mobx"
import nanoid from "nanoid"

const isAnInputFocused = () => {
  return document.querySelector("input:focus")
}

export const KeyHandlers = observer((props) => {
  const ArrowUp = (
    <UseKey
      filter='ArrowUp'
      fn={(event) => {
        const layer = Store.mainSelectedLayer

        if (layer) {
          if (isAnInputFocused()) return
          const newValue = event.shiftKey ? layer.style.top - 10 : layer.style.top - 1
          layer.style.setTop(newValue)
        }
      }}
    />
  )

  const ArrowDown = (
    <UseKey
      filter='ArrowDown'
      fn={(event) => {
        const layer = Store.mainSelectedLayer

        if (layer) {
          console.log("SEL LAYER", layer)
          if (isAnInputFocused()) return
          const newValue = event.shiftKey ? layer.style.top + 10 : layer.style.top + 1
          layer.style.setTop(newValue)
        }
      }}
    />
  )

  const ArrowLeft = (
    <UseKey
      filter='ArrowLeft'
      fn={(event) => {
        const layer = Store.mainSelectedLayer

        if (layer) {
          if (isAnInputFocused()) return
          const newValue = event.shiftKey ? layer.style.left - 10 : layer.style.left - 1
          layer.style.setLeft(newValue)
        }
      }}
    />
  )

  const ArrowRight = (
    <UseKey
      filter='ArrowRight'
      fn={(event) => {
        const layer = Store.mainSelectedLayer

        if (layer) {
          if (isAnInputFocused()) return
          const newValue = event.shiftKey ? layer.style.left + 10 : layer.style.left + 1
          layer.style.setLeft(newValue)
        }
      }}
    />
  )

  const Delete = (
    <UseKey
      filter='Delete'
      fn={(event) => {
        const layer = Store.mainSelectedLayer

        if (layer) {
          if (isAnInputFocused()) return
          layer.trash()
        }
      }}
    />
  )

  const d = (
    <UseKey
      filter='d'
      fn={(event) => {
        const layer = Store.mainSelectedLayer
        event.preventDefault()

        if (layer && event.ctrlKey) {
          event.preventDefault()
          Store.deselectLayer()
        }
      }}
    />
  )

  const n = (
    <UseKey
      filter='n'
      fn={(event) => {
        const layer = Store.mainSelectedLayer
        event.preventDefault()

        console.log(layer, event.altKey, event)

        if (layer && event.altKey) {
          const newLayer = toJS(layer)
          newLayer.id = nanoid()
          newLayer.name = newLayer.name + " copy"

          newLayer.type === "text" && Store.addTextLayer(newLayer)
          newLayer.type === "image" && Store.addImageLayer(newLayer)
          newLayer.type === "box" && Store.addBoxLayer(newLayer)
          return
        }
      }}
    />
  )

  return (
    <>
      {ArrowUp}
      {ArrowDown}
      {ArrowLeft}
      {ArrowRight}
      {Delete}
      {d}
      {n}
    </>
  )
})
