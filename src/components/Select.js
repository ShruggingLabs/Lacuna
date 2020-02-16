import React from "react"
import { Select as _Select } from "evergreen-ui"
import classcat from "classcat"

import styles from "./Select.module.css"
import { Icon } from "./Icon"

export const Select = (props) => {
  const { options, ...selectProps } = props
  const containerStyle = { width: props.width || "100%" }
  const selectClassName = classcat([styles.Select, props.className])

  return (
    <div className={styles.SelectContainer} title={props.hint} style={containerStyle}>
      <_Select {...selectProps} className={selectClassName}>
        <For each='value' of={options}>
          <div value={value} key={value}>
            {value}
          </div>
        </For>
      </_Select>
    </div>
  )
}

Select.defaultProps = {
  options: [],
  className: "",
  width: "100%",
  step: 1,
  hint: ""
}
