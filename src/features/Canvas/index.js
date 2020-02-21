import { autorun } from "mobx"
import { observer, Observer } from "mobx-react"
import React, { Component } from "react"
import Dropzone from "react-dropzone"
import Konva from "konva"
import { Layer, Rect, Stage, Group, Text } from "react-konva"
import * as services from "../../services/database"
import Store from "../../state/index"
import * as storage from "../../utilities/backend/storage"
import { scaleCanvas } from "../../utilities/scaleCanvas"
import { CanvasImage } from "./CanvasImage"
import { Transformer } from "./Transformer"
import { CanvasGrid } from "./CanvasGrid"
import { FastLayer } from "react-konva"

import "./Canvas.css"

class CanvasComponent extends Component {
  dropzoneRef = React.createRef()
  stageRef = React.createRef()

  onCanvasClick = (event) => {
    event.target?.attrs?.layer
      ? Store.selectLayer(event.target.attrs.layer)
      : Store.deselectLayer()
  }

  componentDidMount() {
    autorun(() => {
      const layerCount = Store.layers.length
      this.forceUpdate()
    })

    if (window.location.href.endsWith("/preview")) {
      const canvas = document.querySelector("canvas")
      scaleCanvas(canvas, 2550, 3300)
      this.forceUpdate()
    }
  }

  onImageUpload = async (files) => {
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
          height: data.styleOriginalHeight,
          width: data.styleOriginalWidth
        }
      })
    }
  }

  render() {
    const layers = Store.layers
    const isCanvasGridVisible = Store.isCanvasGridVisible
    const selectedId = Store.mainSelectedLayer?.id
    const isLoadingFont = Store.isLoadingFont
    const forceUpdate = () => this.forceUpdate

    return (
      <Observer>
        {() => (
          <Dropzone noClick ref={this.dropzoneRef} onDrop={this.onImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <div
                id='Canvas'
                className='Canvas'
                {...getRootProps({
                  onClick: (event) => event.preventDefault(),
                  className: "CanvasContainer"
                })}
              >
                <Stage
                  width={2550}
                  height={3300}
                  scaleX={1}
                  scaleY={1}
                  ref={this.stageRef}
                  onClick={this.onCanvasClick}
                >
                  <Layer imageSmoothingEnabled={false} imageSmoothingQuality='high'>
                    <CanvasBackground />
                    <CanvasGrid
                      cellSize={25}
                      isVisible={isCanvasGridVisible}
                      strokeColor='#36AEE8'
                    />
                    {layers.map((layer) => {
                      if (layer.type === "image") {
                        return (
                          <CanvasImageLayer
                            layer={layer}
                            onReady={() => Store.setIsLoadingImage(false)}
                            onImageLoaded={forceUpdate}
                          />
                        )
                      }

                      if (layer.type === "text") {
                        return (
                          <CanvasTextLayer
                            layer={layer}
                            updateParent={forceUpdate}
                            isSelected={Store.isSelected(layer.id)}
                          />
                        )
                      }

                      if (layer.type === "box") {
                        return (
                          <CanvasBoxLayer
                            layer={layer}
                            updateParent={forceUpdate}
                            isSelected={Store.isSelected(layer.id)}
                          />
                        )
                      }

                      return null
                    })}
                    <Transformer selectedId={selectedId} stage={this.stageRef} />
                  </Layer>
                </Stage>
              </div>
            )}
          </Dropzone>
        )}
      </Observer>
    )
  }
}

export const Canvas = observer(CanvasComponent)

const CanvasTextLayer = observer((props) => {
  const ref = React.useRef()
  const isDraggable = props.layer.isVisible && props.isSelected

  const onDragEnd = ({ target }) => {
    props.layer.reposition(target.attrs)
  }

  const onTransform = ({ evt, currentTarget }) => {
    currentTarget.setAttrs({
      width: Math.round(currentTarget.width() * currentTarget.scaleX()),
      scaleX: 1
    })
  }

  const onTransformEnd = ({ target }) => {
    props.layer.style.setWidth(Math.round(target.width()))
  }

  React.useEffect(() => {
    props.updateParent()
  }, [props.layer.style.isLoadingFont])

  return (
    <Text
      ref={ref}
      type='text'
      id={props.layer.id}
      layer={props.layer}
      name={props.layer.name}
      layerId={props.layer.id}
      draggable={isDraggable}
      visible={props.layer.isVisible}
      x={props.layer.style.left}
      y={props.layer.style.top}
      scaleX={props.layer.scaleX}
      scaleY={props.layer.scaleY}
      offsetX={0}
      offsetY={0}
      dragDistance={12}
      wrap='word'
      opacity={props.layer.style.opacity}
      fill={props.layer.style.rgbaColorString}
      lineHeight={props.layer.style.lineHeight}
      letterSpacing={props.layer.style.letterSpacing}
      fontFamily={props.layer.style.fontFamily}
      fontSize={props.layer.style.fontSize}
      fontStyle={`${props.layer.style.fontWeight} ${props.layer.style.fontStyle}`}
      fontWeight={props.layer.style.fontWeight}
      width={props.layer.style.width}
      verticalAlign={props.layer.style.verticalAlign}
      align={props.layer.style.align}
      text={props.layer.text}
      onDragEnd={onDragEnd}
      onTransform={onTransform}
      onTransformEnd={onTransformEnd}
    />
  )
})

const CanvasImageLayer = observer((props) => {
  const ref = React.useRef()

  const onDragEnd = ({ target }) => {
    props.layer.reposition(target.attrs)
  }

  const onTransform = ({ evt, currentTarget }) => {
    currentTarget.setAttrs({
      width: Math.round(currentTarget.width() * currentTarget.scaleX()),
      height: Math.round(currentTarget.height() * currentTarget.scaleY()),
      scaleX: 1
    })
  }

  const onTransformEnd = ({ target }) => {
    props.layer.style.setWidth(Math.round(target.width()))
    props.layer.style.setHeight(Math.round(target.height()))
  }

  return (
    <CanvasImage
      ref={ref}
      type='image'
      layer={props.layer}
      onReady={props.onReady}
      opacity={props.layer.style.opacity}
      draggable={props.layer.isVisible && Store.isSelected(props.layer.id)}
      isSelected={props.layer.isVisible && Store.isSelected(props.layer.id)}
      visible={props.layer.isVisible}
      x={props.layer.style.left}
      width={props.layer.style.width}
      height={props.layer.style.height}
      y={props.layer.style.top}
      src={props.layer.image.fileUrl}
      id={props.layer.id}
      layerId={props.layer.id}
      onDragEnd={onDragEnd}
      onTransform={onTransform}
      onTransformEnd={onTransformEnd}
    />
  )
})

const CanvasBoxLayer = observer((props) => {
  const ref = React.useRef()

  const onDragEnd = ({ target }) => {
    props.layer.reposition(target.attrs)
  }

  const onTransform = ({ evt, currentTarget }) => {
    currentTarget.setAttrs({
      width: Math.round(currentTarget.width() * currentTarget.scaleX()),
      height: Math.round(currentTarget.height() * currentTarget.scaleY()),
      scaleX: 1
    })
  }

  const onTransformEnd = ({ target }) => {
    props.layer.style.setWidth(Math.round(target.width()))
    props.layer.style.setHeight(Math.round(target.height()))
  }

  return (
    <Rect
      ref={ref}
      type='box'
      layer={props.layer}
      opacity={props.layer.style.opacity}
      fill={props.layer.style.rgbaBackgroundColorString}
      draggable={props.layer.isVisible && Store.isSelected(props.layer.id)}
      isSelected={props.layer.isVisible && Store.isSelected(props.layer.id)}
      visible={props.layer.isVisible}
      x={props.layer.style.left}
      width={props.layer.style.width}
      height={props.layer.style.height}
      y={props.layer.style.top}
      id={props.layer.id}
      layerId={props.layer.id}
      onDragEnd={onDragEnd}
      onTransform={onTransform}
      onTransformEnd={onTransformEnd}
    />
  )
})

export const CanvasBackground = (props) => {
  return <Rect fill='#fff' x={0} y={0} width={2550} height={3300} />
}
