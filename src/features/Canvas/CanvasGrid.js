import React, { Component } from "react"
import { Stage, Group, Layer, Image, Text, Rect, Line } from "react-konva"
import { observer, Observer } from "mobx-react"
import nanoid from "nanoid"
import Store from "../../state/index"

const TOTAL_CANVAS_PIXELS = 816 * 1056
const CANVAS_WIDTH = 816
const CANVAS_HEIGHT = 1056

const useGrid = (options) => {
  const [grid, setGrid] = React.useState({
    xLines: [],
    yLines: []
  })

  React.useEffect(() => {
    const totalCells = TOTAL_CANVAS_PIXELS / options.cellSize
    const totalLinesX = Math.ceil(CANVAS_WIDTH / options.cellSize)
    const totalLinesY = Math.ceil(CANVAS_HEIGHT / options.cellSize)

    const xLines = Array(totalLinesX)
      .fill("")
      .map((_, index) => {
        return (
          <Line
            key={`x-${index}`}
            x={index * options.cellSize}
            y={0}
            width={options.cellSize}
            height={options.cellSize}
            stroke={options.strokeColor}
            strokeWidth={1}
            strokeScaleEnabled={false}
            visible={options.isVisible}
            points={[0, 1056, 0, 0]}
          />
        )
      })

    const yLines = Array(totalLinesY)
      .fill("")
      .map((_, index) => {
        return (
          <Line
            key={`y-${index}`}
            x={0}
            y={index * options.cellSize}
            width={options.cellSize}
            height={options.cellSize}
            stroke={options.strokeColor}
            strokeWidth={1}
            strokeScaleEnabled={false}
            visible={options.isVisible}
            points={[0, 0, 816, 0]}
          />
        )
      })

    setGrid({ xLines, yLines })
  }, [options.cellSize])

  return grid
}

export const CanvasGrid = observer((props) => {
  const grid = useGrid(props)
  return props.isVisible ? <Group children={[...grid.xLines, ...grid.yLines]} /> : null
})

// x={20}
// y={200}
// points={[0, 0, 100, 0, 100, 100]}
// tension={0.5}
// closed
// stroke="black"
// x={0}
// y={0}
// width={816}
// height={1056}
// fill='#fff'
// stroke='#ddd'
// strokeWidth={1}
// strokeScaleEnabled = { false }
// visible={options.isVisible}
// shadowColor='black'
// shadowBlur={2}
// shadowOffset={SHADOW_OFFSET}
// shadowOpacity={0.4}
// draggable={true}
// fillLinearGradientStartPoint={{ x: -50, y: -50 }}
// fillLinearGradientEndPoint={{ x: 50, y: 50 }}
// fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
