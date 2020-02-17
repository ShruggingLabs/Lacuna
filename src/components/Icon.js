import * as React from "react"
import classcat from "classcat"

import "./Icon.css"
import { Icon as _Icon } from "@blueprintjs/core"

export const Unicon = (props) => {
  const { name, className, hint, ...otherProps } = props
  const classNames = classcat(["LacunaIcon _unicon", "uil", `uil-${props.name}`, className])

  return <i className={classNames} title={hint} {...otherProps} />
}

export const Icon = _Icon

// Icon.defaultProps = {
//   color: "#7B8B9A",
//   size: "24px"
// }
