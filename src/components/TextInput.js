import React from "react"
import { TextInputField, TextInput as _TextInput, Strong } from "evergreen-ui"
import classcat from "classcat"

import styles from "./TextInput.module.css"
import { Icon, Unicon } from "./Icon"

const LeadingIcon = (props) => {
  const sharedProps = {
    hint: props.iconHint,
    className: styles.leadingIcon
  }

  return props.uniconName ? (
    <Unicon size='14px' name={props.uniconName} {...sharedProps} />
  ) : (
    <Icon iconSize='14px' icon={props.iconName} {...sharedProps} />
  )
}

export const TextInput = (props) => {
  const { textAlign, variant, className, tagText, width } = props
  const { iconHint, iconName, uniconName, ...inputProps } = props
  const isMinimalVariant = variant === "minimal"

  const variantClassName = isMinimalVariant ? styles.minimalVariant : ""
  const textInputClassName = classcat([styles.TextInput, variantClassName, className])
  const containerStyle = { width, textAlign }

  if (isMinimalVariant) {
    return (
      <div className={styles.TextInputContainer} title={iconHint} style={containerStyle}>
        <_TextInput
          {...inputProps}
          marginBottom={0}
          textAlign={textAlign}
          className={textInputClassName}
          style={{ textAlign }}
        />
        <Choose>
          <When condition={iconName || uniconName}>
            <LeadingIcon {...props} />
          </When>
        </Choose>
        <If condition={props.tagText}>
          <Strong className={styles.tagText} color=''>
            {tagText}
          </Strong>
        </If>
      </div>
    )
  }

  return (
    <div className={styles.TextInputContainer} title={props.iconHint} style={containerStyle}>
      <TextInputField
        className={textInputClassName}
        {...inputProps}
        marginBottom={0}
        // id="ids-are-optional"
        // label="A required text input field"
        // required
        // description="This is a description."
        // placeholder="Placeholder text"
      />
    </div>
  )
}

TextInput.defaultProps = {
  width: "100%",
  step: 1,
  label: "",
  className: "",
  variant: "normal",
  textAlign: "",
  onChange: () => {}
}
