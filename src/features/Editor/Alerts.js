import { Icon, Pane, Spinner, Text } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import Spacer from "react-spacer"
import Store from "../../state"

export const Alerts = observer((props) => {
  return null
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
