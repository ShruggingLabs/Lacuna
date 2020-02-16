import { autorun } from "mobx"
import { observer, Observer } from "mobx-react"
import React, { Component } from "react"
import Dropzone from "react-dropzone"
import { Layer, Rect, Stage, Text } from "react-konva"
import * as services from "../../services/database"
import Store from "../../state/index"
import * as storage from "../../utilities/backend/storage"
import { CanvasImage } from "./CanvasImage"
import { Transformer } from "./Transformer"
import { CanvasGrid } from "./CanvasGrid"

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
                  width={816}
                  height={1056}
                  scaleX={1}
                  scaleY={1}
                  ref={this.stageRef}
                  onClick={this.onCanvasClick}
                >
                  <Layer>
                    <CanvasGrid
                      cellSize={10}
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
      fill={props.layer.style.rgbaColorString}
      lineHeight={props.layer.style.lineHeight}
      letterSpacing={props.layer.style.letterSpacing}
      fontFamily={props.layer.style.fontFamily}
      fontSize={props.layer.style.fontSize}
      fontStyle={`${props.layer.style.fontWeight} ${props.layer.style.fontStyle}`}
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
