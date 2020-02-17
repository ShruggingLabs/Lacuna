import { Pane } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import Spacer from "react-spacer"
import { CapsText } from "../../../components/CapsText"
import { TextInput } from "../../../components/TextInput"
import { withEventValue } from "../../../utilities/withEventValue"

const EditorSectionRow = (props) => {
  return (
    <>
      <Pane
        display='flex'
        flexWrap='nowrap'
        flexDirection='row'
        justifyContent='stretch'
        width='100%'
      >
        {props.children}
      </Pane>
      <Spacer height='8px' />
    </>
  )
}

const EditorSectionTitle = (props) => {
  return (
    <>
      <EditorSectionRow>
        <CapsText>{props.title}</CapsText>
      </EditorSectionRow>
    </>
  )
}

export const EditorSection = (props) => {
  return (
    <>
      <Pane display='flex' flexDirection='column'>
        <EditorSectionTitle title={props.title} />
        {props.children}
      </Pane>
      <Spacer shrink={0} height='8px' />
    </>
  )
}

EditorSection.Row = EditorSectionRow
