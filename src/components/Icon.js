import * as React from "react"
import classcat from "classcat"

import "./Icon.css"

export const Icon = (props) => {
  const { name, className, hint, ...otherProps } = props
  const classNames = classcat(["Gen3Icon", "uil", `uil-${props.name}`, className])

  return <i className={classNames} title={hint} {...otherProps} />
}

Icon.defaultProps = {
  color: "#7B8B9A",
  size: "24px"
}
