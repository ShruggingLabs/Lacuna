import React from "react"
import { TextInput as _TextInput, Strong } from "evergreen-ui"
import classcat from "classcat"

import styles from "./TextInput.module.css"
import { Icon } from "./Icon"

export const TextInput = (props) => {
  const textInputClassName = classcat([styles.TextInput, props.className])
  const containerStyle = { width: props.width || "100%" }

  return (
    <div className={styles.TextInputContainer} title={props.iconHint} style={containerStyle}>
      <_TextInput {...props} className={textInputClassName} />
      <Choose>
        <When condition={props.iconName}>
          <Icon name={props.iconName} hint={props.iconHint} className={styles.leadingIcon} />
        </When>
      </Choose>
      <If condition={props.tagText}>
        <Strong className={styles.tagText} color=''>
          {props.tagText}
        </Strong>
      </If>
    </div>
  )
}

TextInput.defaultProps = {
  width: "100%",
  step: 1
}
