import * as React from "react"
import classcat from "classcat"

import "./Icon.css"

// const StyledIcon = styled.i`
//   color: ${(props) => props.color};
//   font-size: ${(props) => props.size};
//   display: inline-flex;
//   cursor: ${(props) => (props.onClick ? 'pointer' : 'inherit')};

//   :after {
//     display: flex;
//     font-style: normal;
//     font-size: 12px;
//     font-weight: 400;
//     margin-left: 2px;
//     margin-top: 2px;
//   }
// `

export const Icon = (props) => {
  const { name, className, hint, ...otherProps } = props
  const classNames = classcat(["Gen3Icon", "uil", `uil-${props.name}`, className])

  return <i className={classNames} title={hint} {...otherProps} />
}

Icon.defaultProps = {
  color: "#E4E7EB",
  size: "24px"
}
