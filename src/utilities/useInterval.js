import * as React from "react"

export const useInterval = (condition, handler, alternateHandler, interval) => {
  const deleteInterval = React.useRef()
  const result = condition()

  React.useEffect(() => {
    if (result) {
      deleteInterval.current = setInterval(handler, interval)
    }

    if (!result) {
      clearInterval(deleteInterval.current)
      alternateHandler()
    }
  }, [result])
}
