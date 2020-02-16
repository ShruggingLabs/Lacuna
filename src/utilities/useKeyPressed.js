export const useKeysPressed = () => {
  const [keysPressed, setKeysPressed] = React.useState([])

  const registerEventListeners = () => {
    const handler = (event) => {
      if (event.type === "keydown") {
        setKeysPressed([...keysPressed, event.key])
      }

      if (event.type === "keyup") {
        setKeysPressed(
          keysPressed.filter((key) => {
            return key !== event.key
          })
        )
      }
    }

    window.addEventListener("keydown", handler)
    window.addEventListener("keyup", handler)

    return () => {
      window.removeEventListener("keydown", handler)
      window.removeEventListener("keyup", handler)
    }
  }

  React.useEffect(registerEventListeners, [keysPressed.length])

  return keysPressed
}
