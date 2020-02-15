import * as React from "react"
import { Image } from "react-konva"
import useImage from "use-image"

export const CanvasImage = ({ src, ...props }) => {
  const [image, status] = useImage(src)

  React.useEffect(() => {
    if (status === "loaded") {
      props.onReady()
    }
  }, [status])

  return <Image {...props} image={image} ref={props.innerRef} />
}
