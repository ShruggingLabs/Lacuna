import React from "react"

import { Stage, Layer, Group, Image, Transformer } from "react-konva"
import { CanvasImage } from "./CanvasImage"
import useImage from "use-image"

export const Transformable = (props) => {
  const [image] = useImage(props.src)
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  const { onSelect, shapeProps, isSelected, onChange, src, ...otherProps } = props

  React.useEffect(() => {
    if (props.isSelected) {
      trRef.current.setNode(shapeRef.current)
      trRef.current.getLayer().batchDraw()
    }
  }, [props.isSelected])

  return (
    <React.Fragment>
      <CanvasImage
        image={image}
        onClick={props.onSelect}
        ref={shapeRef}
        {...props.shapeProps}
        draggable={props.isSelected}
        onDragEnd={(e) => {
          props.onChange({
            ...props.shapeProps,
            x: e.target.x(),
            y: e.target.y()
          })
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)
          props.onChange({
            ...props.shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
          })
        }}
      />
      {props.isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </React.Fragment>
  )
}
