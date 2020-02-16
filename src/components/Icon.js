import * as React from "react"
import classcat from "classcat"

import "./Icon.css"
import { Icon as _Icon } from "evergreen-ui"

const Unicon = (props) => {
  const { name, className, hint, ...otherProps } = props
  const classNames = classcat(["Gen3Icon", "uil", `uil-${props.name}`, className])

  return <i className={classNames} title={hint} {...otherProps} />
}

const Evergreen = _Icon

export const Icon = Unicon

Icon.Evergreen = Evergreen

Icon.defaultProps = {
  color: "#7B8B9A",
  size: "24px"
}
