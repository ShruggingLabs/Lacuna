import * as React from "react"
import { Alert, Text, Spinner, InlineAlert, Pane, Button, Badge, Icon } from "evergreen-ui"

// import { Classes, Icon, Menu, MenuDivider, MenuItem, Collapse } from '@blueprintjs/core'
// import { observer } from 'mobx-react'
// import { useStore } from 'mobx-store-provider'

import { LayersListMenu } from "./LayersListMenu"
import { DocumentToolsMenu } from "./DocumentToolsMenu"
import Store from "../../state"
import { observer } from "mobx-react"
import Spacer from "react-spacer"
import { Alerts } from "./Alerts"
export const LeftMenuColumn = observer((props) => {
  return (
    <div className='LeftMenuColumn'>
      <DocumentToolsMenu />
      <div className='spacer24' />
      <LayersListMenu />
      <Spacer height='24px' />
      <Alerts />
    </div>
  )
})
