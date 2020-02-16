import * as React from "react"
import { Text } from "evergreen-ui"

export const CapsText = (props) => {
  return (
    <Text {...props} style={{ textTransform: "uppercase", letterSpacing: 3, fontWeight: 700 }} />
  )
}

CapsText.defaultProps = {
  size: 300,
  color: "#7B8B9A"
}
