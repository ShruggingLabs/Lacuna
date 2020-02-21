import * as React from "react"
import Store from "#state"
import styles from "./DOMCanvas.module.css"
import { LayersListMenu } from "#features/Editor/LayersListMenu"
import { LayerEditorMenu } from "#features/Editor/LayerEditorMenu"
import { DocumentControlPanel } from "./DocumentControlPanel/DocumentControlPanel"
import Spacer from "react-spacer"
import { observer, Observer } from "mobx-react"
import Dropzone from "react-dropzone"
import { DocumentLayers } from "./DocumentLayers"
import { KeyHandlers } from "./KeyHandlers"
import * as storage from "../../utilities/backend/storage"
import * as services from "../../services/database"

const onImageUpload = async (files) => {
  Store.setIsLoadingImage(true)

  const uploads = await services.cdn.uploadFiles({
    projectId: "2Ful8McNxcefAlD23AjrMh",
    files
  })

  const uploadsData = await storage.getUploadsData(uploads)

  for (const data of uploadsData) {
    Store.addImageLayer({
      image: data,
      style: {
        height: "auto",
        width: data.styleOriginalWidth
      }
    })
  }
}

const onCanvasClick = (event) => {
  const isDocumentClick = event.target.getAttribute("id") === "Document"
  const isLayerClick = event.target.matches("[data-layer-id]")
  const id = event.target.getAttribute("data-layer-id")
  const isLocked = event.target.getAttribute("data-layer-locked") === "true"

  isDocumentClick && Store.deselectLayer()
  isLayerClick && !isLocked && Store.selectLayer(id)
}

export const DOMCanvas = observer((props) => {
  const isCanvasGridVisible = Store.isCanvasGridVisible
  const selectedId = Store.mainSelectedLayer?.id
  const isLoadingFont = Store.isLoadingFont
  const documentZoomLevel = Store.documentZoomLevel

  const cssVariables = {
    "--zoomLevel": documentZoomLevel
  }

  return (
    <>
      <KeyHandlers />
      <div className={styles.DOMCanvas} style={cssVariables}>
        <div className={styles.documentScroller}>
          <div className={styles.padder} />
          <Document />
          <div className={styles.padder} />
        </div>
      </div>
      <CanvasPanels />
    </>
  )
})

const Document = observer((props) => {
  const ref = React.useRef()
  const layers = Store.layers

  return (
    <Dropzone noClick ref={ref} onDrop={onImageUpload}>
      {({ getRootProps, getInputProps }) => (
        <Observer>
          {() => (
            <div
              {...getRootProps({
                onClick: onCanvasClick,
                className: styles.document,
                id: "Document"
              })}
            >
              <DocumentLayers />
            </div>
          )}
        </Observer>
      )}
    </Dropzone>
  )
})

const CanvasPanels = (props) => {
  return (
    <>
      <div className={styles.leftPanel}>
        <DocumentControlPanel />
        <Spacer height='24px' />
        <LayersListMenu />
      </div>
      <div className={styles.rightPanel}>
        <LayerEditorMenu />
      </div>
    </>
  )
}
