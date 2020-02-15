import * as React from "react"
import { Portal } from "react-portal"

const getRectJSON = (element) => {
  const rect = element.getBoundingClientRect()
  return JSON.parse(JSON.stringify(rect))
}

const getElementSpecs = (element) => {
  const elementRect = getRectJSON(element)

  const topLeftCoordinates = {
    x: elementRect.left,
    y: elementRect.top
  }

  const topRightCoordinates = {
    x: elementRect.left + elementRect.width,
    y: elementRect.top
  }

  const bottomRightCoordinates = {
    x: elementRect.left + elementRect.width,
    y: elementRect.top + elementRect.height
  }

  const bottomLeftCoordinates = {
    x: elementRect.left,
    y: elementRect.top + elementRect.height
  }

  return {
    ...elementRect,
    topLeftCoordinates,
    topRightCoordinates,
    bottomRightCoordinates,
    bottomLeftCoordinates
  }
}

export const LayerHandles = (props) => {
  if (props.selector) {
    return (
      <Portal>
        <Handles {...props} />
      </Portal>
    )
  }

  return null
}

LayerHandles.defaultProps = {
  onMouseDown: () => {},
  onMouseUp: () => {},
  onMouseMove: () => {}
}

const MUTATION_OBSERVER_CONFIG = {
  attributes: true,
  attributeOldValue: true,
  characterData: true,
  characterDataOldValue: true,
  childList: true
}

const onElementChange = (target, handler) => {
  const observer = new MutationObserver((mutations) => {
    handler(mutations)
  })

  observer.observe(target, MUTATION_OBSERVER_CONFIG)

  // NOTE: Arrow function is needed for some funky reason
  // or else "Illegal Invocation" gets throws when React.useEffect
  // calls dusconnect().
  return () => observer.disconnect()
}

const useElementSpecs = (props) => {
  const [elementSpecs, setElementSpecs] = React.useState()

  React.useEffect(() => {
    if (props.selector) {
      const target = document.querySelector(props.selector)
      setElementSpecs(getElementSpecs(target))
      const onChange = (mutations) => setElementSpecs(getElementSpecs(target))
      const disconnect = onElementChange(target, onChange)
      let parentDisconnect

      if (props.parentSelector) {
        const parent = document.querySelector(props.parentSelector)
        const onChange = (mutations) => setElementSpecs(getElementSpecs(target))
        parentDisconnect = onElementChange(parent, onChange)
      }

      return () => {
        disconnect()
        parentDisconnect && parentDisconnect()
      }
    }
  }, [props.selector])

  return [elementSpecs]
}

const Handles = (props) => {
  const [elementSpecs] = useElementSpecs(props)

  if (!elementSpecs) return null

  const topLeftHandleStyle = {
    display: props.hideCorners ? "none" : "inherit",
    userSelect: "none",
    position: "absolute",
    width: 8,
    height: 8,
    background: "#fff",
    border: "1px solid black",
    left: elementSpecs.topLeftCoordinates.x,
    top: elementSpecs.topLeftCoordinates.y,
    transform: "translate(-100%, -100%)"
  }

  const topRightHandleStyle = {
    display: props.hideCorners ? "none" : "inherit",
    userSelect: "none",
    position: "absolute",
    width: 8,
    height: 8,
    background: "#fff",
    border: "1px solid black",
    left: elementSpecs.topRightCoordinates.x,
    top: elementSpecs.topRightCoordinates.y,
    transform: "translateY(-100%)"
  }

  const bottomRightHandleStyle = {
    display: props.hideCorners ? "none" : "inherit",
    userSelect: "none",
    position: "absolute",
    width: 8,
    height: 8,
    background: "#fff",
    border: "1px solid black",
    left: elementSpecs.bottomRightCoordinates.x,
    top: elementSpecs.bottomRightCoordinates.y
  }

  const bottomLeftHandleStyle = {
    display: props.hideCorners ? "none" : "inherit",
    userSelect: "none",
    position: "absolute",
    width: 8,
    height: 8,
    background: "#fff",
    border: "1px solid black",
    left: elementSpecs.bottomLeftCoordinates.x,
    top: elementSpecs.bottomLeftCoordinates.y,
    transform: "translateX(-100%)"
  }

  // BORDERS

  const topHandleStyle = {
    width: elementSpecs.width + 16,
    maxHeight: 1,
    left: elementSpecs.topLeftCoordinates.x + elementSpecs.width + 8,
    top: elementSpecs.topLeftCoordinates.y
  }

  const rightHandleStyle = {
    height: elementSpecs.height + 16,
    maxWidth: 1,
    left: elementSpecs.topRightCoordinates.x,
    top: elementSpecs.topRightCoordinates.y + elementSpecs.height + 8
  }

  const bottomHandleStyle = {
    width: elementSpecs.width + 16,
    maxHeight: 1,
    left: elementSpecs.topLeftCoordinates.x - 8,
    top: elementSpecs.bottomRightCoordinates.y
  }

  const leftHandleStyle = {
    height: elementSpecs.height + 16,
    maxWidth: 1,
    left: elementSpecs.bottomLeftCoordinates.x,
    top: elementSpecs.topRightCoordinates.y - 8
  }

  return (
    <>
      {!props.hideCorners && (
        <>
          <div
            className='_reactLayerHandle _topLeftLayerHandle'
            style={topLeftHandleStyle}
            onMouseDown={(event) => props.onMouseDown(event, "topLeft")}
            onMouseUp={(event) => props.onMouseUp(event, "topLeft")}
            onMouseMove={(event) => props.onMouseMove(event, "topLeft")}
          />
          <div
            className='_reactLayerHandle _topRightLayerHandle'
            style={topRightHandleStyle}
            onMouseDown={(event) => props.onMouseDown(event, "topRight")}
            onMouseUp={(event) => props.onMouseUp(event, "topRight")}
            onMouseMove={(event) => props.onMouseMove(event, "topRight")}
          />
          <div
            className='_reactLayerHandle _bottomRightLayerHandle'
            style={bottomRightHandleStyle}
            onMouseDown={(event) => props.onMouseDown(event, "bottomRight")}
            onMouseUp={(event) => props.onMouseUp(event, "bottomRight")}
            onMouseMove={(event) => props.onMouseMove(event, "bottomRight")}
          />
          <div
            className='_reactLayerHandle _bottomLeftLayerHandle'
            style={bottomLeftHandleStyle}
            onMouseDown={(event) => props.onMouseDown(event, "bottomLeft")}
            onMouseUp={(event) => props.onMouseUp(event, "bottomLeft")}
            onMouseMove={(event) => props.onMouseMove(event, "bottomLeft")}
          />
        </>
      )}

      <div
        className='_reactLayerHandle _borderHandle _topLayerHandle'
        style={topHandleStyle}
        onMouseDown={(event) => props.onMouseDown(event, "top")}
        onMouseUp={(event) => props.onMouseUp(event, "top")}
        onMouseMove={(event) => props.onMouseMove(event, "top")}
      />
      <div
        className='_reactLayerHandle _borderHandle _rightLayerHandle'
        style={rightHandleStyle}
        onMouseDown={(event) => props.onMouseDown(event, "right")}
        onMouseUp={(event) => props.onMouseUp(event, "right")}
        onMouseMove={(event) => props.onMouseMove(event, "right")}
      />
      <div
        className='_reactLayerHandle _borderHandle _bottomLayerHandle'
        style={bottomHandleStyle}
        onMouseDown={(event) => props.onMouseDown(event, "bottom")}
        onMouseUp={(event) => props.onMouseUp(event, "bottom")}
        onMouseMove={(event) => props.onMouseMove(event, "bottom")}
      />
      <div
        className='_reactLayerHandle _borderHandle _leftLayerHandle'
        style={leftHandleStyle}
        onMouseDown={(event) => props.onMouseDown(event, "left")}
        onMouseUp={(event) => props.onMouseUp(event, "left")}
        onMouseMove={(event) => props.onMouseMove(event, "left")}
      />
    </>
  )
}

export const LayerOverlay = (props) => {
  const [elementSpecs] = useElementSpecs(props.selector)

  if (!elementSpecs) return null

  const overlayStyle = {
    position: "absolute",
    left: elementSpecs.topLeftCoordinates.x,
    top: elementSpecs.topLeftCoordinates.y,
    width: elementSpecs.width,
    height: elementSpecs.height
  }

  return (
    <Portal>
      <div style={overlayStyle}>{props.children}</div>
    </Portal>
  )
}
