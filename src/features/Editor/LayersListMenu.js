import ClickNHold from "react-click-n-hold"
import * as React from "react"
import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core"
import { observer, Observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc"
import { Icon } from "../../components/Icon"
import Spacer from "react-spacer"

import {
  Icon as EIcon,
  Pane,
  Label,
  Textarea,
  TextInput,
  Text,
  Badge,
  Strong,
  Select,
  Popover,
  Position,
  Positioner,
  Tooltip,
  IconButton,
  Pill,
  Spinner,
  Card,
  Heading
} from "evergreen-ui"

import Store from "../../state"
import getValue from "get-value"
import classcat from "classcat"
import { observable } from "mobx"
import { PanelMenu } from "../../components/PanelMenu/PanelMenu"
import { LayerContainer, LayerName, LayerActionIcons } from "./LayersList/LayersList"

import styles from "./LayersListMenu.module.css"

// If the target is a descendant of .LayerActionIcons
// (meaning it is a layer action), prevent drag/drop sorting.
const shouldPreventSort = (event) => {
  return event.target.closest(".LayerActionIcons")
}

export const LayersListMenu = observer(() => {
  const store = useStore()
  const isLayersEmpty = store.layers.length === 0
  const menuTitle = `Layers (${store.layers.length})`

  return (
    <PanelMenu title={menuTitle}>
      <If condition={isLayersEmpty}>
        <div style={{ width: "100%", height: 28 }} />
      </If>
      <If condition={!isLayersEmpty}>
        <LayersList
          lockAxis='y'
          pressDelay={300}
          lockToContainerEdges
          sortingLayerId={Store.sortingLayerId}
          onSortEnd={Store.onLayerSortingEnd}
          onSortStart={Store.onLayerSortingStart}
          shouldCancelStart={shouldPreventSort}
        />
      </If>
    </PanelMenu>
  )
})

const NoLayersText = () => {
  return (
    <div style={{ padding: 8, paddingBottom: 0 }}>
      <p className={Classes.TEXT_MUTED}>No layers yet.</p>
    </div>
  )
}

const LayersList = SortableContainer(
  observer((props) => {
    const layers = Store.reversedLayers

    return (
      <Pane display='flex' flexDirection='column' width='100%' height='100%'>
        <For each='layer' of={layers} index='index'>
          <Observer>
            {() => (
              <LayerItem
                isSorting={props.sortingLayerId === layer.id}
                layer={layer}
                isDeleting={layer.isDeleting}
                isSelected={Store.isSelected(layer.id)}
                isVisible={layer.isVisible}
                index={index}
                key={layer.id}
              />
            )}
          </Observer>
        </For>
      </Pane>
    )
  })
)

const useInterval = (condition, handler, alternateHandler, interval) => {
  const deleteInterval = React.useRef()
  const result = condition()

  React.useEffect(() => {
    if (result) {
      deleteInterval.current = setInterval(handler, interval)
    }

    if (!result) {
      clearInterval(deleteInterval.current)
      alternateHandler()
    }
  }, [result])
}

// TODO: Re-design how deleting works.
// Long click and layer fades out or some shit.
const LayerItem = SortableElement((props) => {
  const [holdSeconds, setHoldSeconds] = React.useState(3)

  const className = classcat([
    styles.LayerItem,
    !props.layer.isVisible && styles.isNotVisible,
    props.isSorting && styles.isSorting,
    props.isSelected && styles.isSelected
  ])

  const onNameClick = (event) => {
    props.layer.isVisible && Store.selectLayer(props.layer)
  }

  const toggleVisibility = (event) => {
    props.isSelected && Store.deselectLayer()
    props.layer.toggleIsVisible()
  }

  useInterval(
    () => props.layer.isDeleting,
    () => setHoldSeconds((n) => n - 1),
    () => setHoldSeconds(3),
    1000
  )

  return (
    <LayerContainer className={className} isSelected={props.isSelected} layerId={props.layer.id}>
      <LayerName onClick={onNameClick} name={props.layer.name} isSelected={props.isSelected} />
      <LayerActionIcons
        toggleVisibility={toggleVisibility}
        isVisible={props.layer.isVisible}
        onStartDeleting={() => props.layer.setIsDeleting(true)}
        onFinishDeleting={props.layer.onDoneDeleting}
        isDeleting={props.layer.isDeleting}
        secondsUntilDelete={holdSeconds}
        isSelected={props.isSelected}
      />
    </LayerContainer>
  )
})
