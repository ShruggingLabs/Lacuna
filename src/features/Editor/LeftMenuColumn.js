import { observer } from "mobx-react"
import * as React from "react"
import Spacer from "react-spacer"
import { Alerts } from "./Alerts"
import { DocumentToolsMenu } from "./DocumentToolsMenu"
import { LayersListMenu } from "./LayersListMenu"

export const LeftMenuColumn = observer((props) => {
  return (
    <div className='LeftMenuColumn'>
      <LayersListMenu />
      <Spacer height='24px' />
      <Alerts />
    </div>
  )
})
