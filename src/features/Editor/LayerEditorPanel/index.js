import * as React from "react"
import { Classes, Menu, MenuDivider, MenuItem, Text, Divider } from "@blueprintjs/core"
import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import classcat from "classcat"
import Spacer from "react-spacer"
import Store from "../../state"
import { Icon } from "../../components/Icon"
import { Input } from "../../components/Input"
import { Button } from "@blueprintjs/core"
import { Pane, Label, Textarea, TextInput, Badge, Strong, Select } from "evergreen-ui"
import { ColorPicker } from "../../components/ColorPicker"

const LayerEditorSectionDivider = props => {
  return (
    <Spacer height='8px' />
    <Divider />
    <Spacer height='12px' />
  )
}

const LayerEditorSectionTitle = props => {
  return <Text></Text>
}

const LayerEditorSection = props => {
  return (
    <div className={styles.LayerEditorSection}>
      <LayerEditorRow>
        <LayerEditorSectionTitle>{props.title}</LayerEditorSectionTitle>
      </LayerEditorRow>
    </div>
  )
}

const LayerEditorRow = (props) => {
  return <div className={styles.LayerEditorRow}>{props.children}</div>
}
