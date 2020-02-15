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

export const Alerts = observer((props) => {
  return (
    <>
      <If condition={Store.isLoadingImage}>
        <Pane display='flex' alignItems='center'>
          <Spinner size={18} />
          <Spacer width='12px' />
          <Text size={400}>Loading image...</Text>
        </Pane>
      </If>

      <If condition={Store.wasImageRecentlyLoaded}>
        <Pane display='flex' alignItems='center'>
          <Icon icon='tick-circle' color='success' />
          <Spacer width='12px' />
          <Text size={400}>Image loaded!</Text>
        </Pane>
      </If>

      <If condition={Store.isLoadingFont}>
        <Pane display='flex' alignItems='center'>
          <Spinner size={18} />
          <Spacer width='12px' />
          <Text size={400}>Loading font...</Text>
        </Pane>
      </If>

      <If condition={Store.wasFontRecentlyLoaded}>
        <Pane display='flex' alignItems='center'>
          <Icon icon='tick-circle' color='success' />
          <Spacer width='12px' />
          <Text size={400}>Font loaded!</Text>
        </Pane>
      </If>
    </>
  )
})
