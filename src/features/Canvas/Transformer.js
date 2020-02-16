import React from "react"
import { Stage, Layer, Image, Transformer as KTransformer } from "react-konva"
import { observer } from "mobx-react"

export class Transformer extends React.Component {
  transformerRef = React.createRef()

  componentDidUpdate(oldProps, oldState) {
    const selectedIdChanged = oldProps.selectedId !== this.props.selectedId
    const stageChanged = oldProps.stage !== this.props.stage

    // if (selectedIdChanged) {
    this.attachTransformer()
    this.drawTransformer()
    // }
  }

  get selectedNode() {
    return this.props.stage.current.findOne(`#${this.props.selectedId}`)
  }

  get anchors() {
    const node = this.selectedNode

    if (node) {
      if (node.attrs.type === "image") {
        return ["bottom-right"]
      }

      if (node.attrs.type === "text") {
        return ["middle-right"]
      }

      if (node.attrs.type === "box") {
        return ["middle-right", "bottom-center"]
      }
    }
  }

  attachTransformer() {
    this.props.selectedId
      ? this.transformerRef.current.setNode(this.selectedNode)
      : this.transformerRef.current.detach()
  }

  drawTransformer() {
    this.transformerRef.current.getLayer().batchDraw()
  }

  render() {
    return (
      <KTransformer
        padding={0}
        borderEnabled={true}
        // centeredScaling
        // keepRatio
        rotateEnabled={false}
        anchorSize={8}
        ignoreStroke
        enabledAnchors={this.anchors}
        ref={this.transformerRef}
        // boundBoxFunc={function(oldBox, newBox) {
        //   newBox.width = Math.max(30, newBox.width)
        //   return newBox
        // }}
      />
    )
  }
}
