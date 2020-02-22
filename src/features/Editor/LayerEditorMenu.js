import { Classes } from "@blueprintjs/core"
import { observer } from "mobx-react"
import * as React from "react"
import { PanelMenu } from "../../components/PanelMenu/PanelMenu"
import Store from "../../state"
import { BoxLayerEditor } from "../DOMCanvas/DocumentLayerEditor/BoxLayerEditor"
import { ImageLayerEditor } from "../DOMCanvas/DocumentLayerEditor/ImageLayerEditor"
import { TextLayerEditor } from "../DOMCanvas/DocumentLayerEditor/TextLayerEditor"

export const LayerEditorMenu = observer((props) => {
  const selectedLayer = Store.mainSelectedLayer
  const isDeleted = selectedLayer?.isDeleted

  return (
    <PanelMenu title='Layer Editor' titleIcon='layer'>
      {!selectedLayer && NoLayerSelectedText}
      {selectedLayer && !isDeleted && <LayerEditor layer={selectedLayer} />}
    </PanelMenu>
  )
})

const LayerEditor = observer((props) => {
  return (
    <div className='LayerEditor'>
      <Choose>
        <When condition={props.layer.type === "text"}>
          <TextLayerEditor layer={props.layer} />
        </When>
        <When condition={props.layer.type === "box"}>
          <BoxLayerEditor layer={props.layer} />
        </When>
        <When condition={props.layer.type === "image"}>
          <ImageLayerEditor layer={props.layer} />
        </When>
      </Choose>
    </div>
  )
})

const NoLayerSelectedText = (
  <div style={{ padding: 12, paddingBottom: 0 }}>
    <p className={Classes.TEXT_MUTED}>No layer selected.</p>
  </div>
)
