import React, { Component } from "react"
import { Stage, Group, Layer, Image, Text, Rect } from "react-konva"
import useImage from "use-image"

import { Alert, Pane, Button, Badge } from "evergreen-ui"

import { CanvasImage } from "./CanvasImage"
import { observable, action, autorun, computed } from "mobx"
import { observer, Observer } from "mobx-react"
import nanoid from "nanoid"
import { Transformer } from "./Transformer"
import Store from "../../state/index"
import Dropzone from "react-dropzone"
import { windowLocation } from "./../../utilities/windowLocation"
import * as services from "../../services/database"
import * as storage from "../../utilities/backend/storage"

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
                  onClick: (event) => event.preventDefault()
                })}
              >
                {/* <input {...getInputProps()} /> */}
                <Stage
                  width={816}
                  height={1056}
                  scaleX={1}
                  scaleY={1}
                  ref={this.stageRef}
                  onClick={this.onCanvasClick}
                >
                  <Layer>
                    {layers.map((layer) => {
                      if (layer.type === "image") {
                        return (
                          <ImageLayer
                            layer={layer}
                            onReady={() => Store.setIsLoadingImage(false)}
                            onImageLoaded={forceUpdate}
                          />
                        )
                      }

                      if (layer.type === "text") {
                        return (
                          <TextLayer
                            layer={layer}
                            updateParent={forceUpdate}
                            isSelected={Store.isSelected(layer.id)}
                          />
                        )
                      }

                      if (layer.type === "box") {
                        return (
                          <BoxLayer
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

const TextLayer = observer((props) => {
  const { layer } = props
  const ref = React.useRef()

  const isDraggable = layer.isVisible && props.isSelected

  const onDragEnd = ({ target }) => {
    layer.reposition(target.attrs)
  }

  const onTransform = ({ evt, currentTarget }) => {
    currentTarget.setAttrs({
      width: Math.floor(currentTarget.width() * currentTarget.scaleX()),
      scaleX: 1
    })
  }

  const onTransformEnd = ({ target }) => {
    layer.style.setWidth(Math.floor(target.width()))
  }

  React.useEffect(() => {
    props.updateParent()
  }, [layer.style.isLoadingFont])

  return (
    <Text
      ref={ref}
      type='text'
      id={layer.id}
      layer={layer}
      name={layer.name}
      layerId={layer.id}
      draggable={isDraggable}
      visible={layer.isVisible}
      x={layer.style.left}
      y={layer.style.top}
      scaleX={layer.scaleX}
      scaleY={layer.scaleY}
      offsetX={0}
      offsetY={0}
      dragDistance={12}
      wrap='word'
      fill={layer.style.rgbaColorString}
      lineHeight={layer.style.lineHeight}
      letterSpacing={layer.style.letterSpacing}
      fontFamily={layer.style.fontFamily}
      fontSize={layer.style.fontSize}
      fontStyle={`${layer.style.fontWeight} ${layer.style.fontStyle}`}
      width={layer.style.width}
      verticalAlign={layer.style.verticalAlign}
      align={layer.style.align}
      text={layer.text}
      onDragEnd={onDragEnd}
      onTransform={onTransform}
      onTransformEnd={onTransformEnd}
    />
  )
})

const ImageLayer = observer((props) => {
  const { layer } = props
  const ref = React.useRef()

  return (
    <CanvasImage
      ref={ref}
      type='image'
      layer={layer}
      onReady={props.onReady}
      draggable={layer.isVisible && Store.isSelected(layer.id)}
      isSelected={layer.isVisible && Store.isSelected(layer.id)}
      visible={layer.isVisible}
      x={layer.style.left}
      width={layer.style.width}
      height={layer.style.height}
      y={layer.style.top}
      src={layer.image.fileUrl}
      id={layer.id}
      layerId={layer.id}
      onDragEnd={({ target }) => {
        layer.reposition(target.attrs)
      }}
      onTransform={({ evt, currentTarget }) => {
        currentTarget.setAttrs({
          width: Math.floor(currentTarget.width() * currentTarget.scaleX()),
          height: Math.floor(currentTarget.height() * currentTarget.scaleY()),
          scaleX: 1
        })
      }}
      onTransformEnd={({ target }) => {
        layer.style.setWidth(Math.floor(target.width()))
        layer.style.setHeight(Math.floor(target.height()))
      }}
    />
  )
})

const BoxLayer = observer((props) => {
  const { layer } = props
  const ref = React.useRef()

  return (
    <Rect
      ref={ref}
      type='box'
      layer={layer}
      fill={layer.style.rgbaBackgroundColorString}
      draggable={layer.isVisible && Store.isSelected(layer.id)}
      isSelected={layer.isVisible && Store.isSelected(layer.id)}
      visible={layer.isVisible}
      x={layer.style.left}
      width={layer.style.width}
      height={layer.style.height}
      y={layer.style.top}
      id={layer.id}
      layerId={layer.id}
      onDragEnd={({ target }) => {
        layer.reposition(target.attrs)
      }}
      onTransform={({ evt, currentTarget }) => {
        currentTarget.setAttrs({
          width: Math.floor(currentTarget.width() * currentTarget.scaleX()),
          height: Math.floor(currentTarget.height() * currentTarget.scaleY()),
          scaleX: 1
        })
      }}
      onTransformEnd={({ target }) => {
        layer.style.setWidth(Math.floor(ref.current.width()))
        layer.style.setHeight(Math.floor(ref.current.height()))
      }}
    />
  )
})

const getTextLayerProps = (layer) => {
  const isSelected = Store.isSelected(layer.id)

  const final = {
    wrap: "word",
    scaleX: layer.scaleX,
    scaleY: layer.scaleY,
    offsetX: 0,
    offsetY: 0,
    dragDistance: 12,
    draggable: true,
    lineHeight: layer.style.lineHeight,
    fontSize: layer.style.fontSize,
    fontStyle: `${layer.style.fontWeight} ${layer.style.fontStyle}`,
    width: layer.style.width,
    verticalAlign: layer.style.verticalAlign,
    align: layer.style.align,
    name: layer.name,
    visible: layer.isVisible,
    text: layer.text,
    layerId: layer.id,
    layer: layer
  }

  return final
}
