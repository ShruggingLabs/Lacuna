import * as React from "react"

export const useMultiKeyPress = () => {
  const [keysPressed, setKeyPressed] = React.useState(new Set([]))

  function downHandler({ key }) {
    setKeyPressed(keysPressed.add(key))
  }

  const upHandler = ({ key }) => {
    keysPressed.delete(key)
    setKeyPressed(keysPressed)
  }

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return keysPressed
}
