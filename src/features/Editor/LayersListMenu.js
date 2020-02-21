import { Classes } from "@blueprintjs/core"
import classcat from "classcat"
import { Pane } from "evergreen-ui"
import { observer, Observer } from "mobx-react"
import * as React from "react"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { PanelMenu } from "../../components/PanelMenu/PanelMenu"
import Store from "../../state"
import { LayerActionIcons, LayerContainer, LayerName } from "./LayersList/LayersList"
import styles from "./LayersListMenu.module.css"
import { DocumentToolsMenu } from "./DocumentToolsMenu"

// If the target is a descendant of .LayerActionIcons
// (meaning it is a layer action), prevent drag/drop sorting.
const shouldPreventSort = (event) => {
  return event.target.closest(".LayerActionIcons")
}

export const LayersListMenu = observer(() => {
  const isLayersEmpty = Store.layers.length === 0

  return (
    <PanelMenu title='Layers' titleIcon='layers'>
      <DocumentToolsMenu />
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
                isLocked={layer.isLocked}
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

// TODO: Re-design how deleting works.
// Long click and layer fades out or some shit.
const LayerItem = SortableElement((props) => {
  const className = classcat([
    styles.LayerItem,
    props.isLocked && styles.isLocked,
    !props.isVisible && styles.isNotVisible,
    props.isSorting && styles.isSorting,
    props.isSelected && styles.isSelected
  ])

  const onNameClick = (event) => {
    props.layer.isVisible && !props.layer.isLocked && Store.selectLayer(props.layer)
  }

  const toggleVisibility = (event) => {
    props.isSelected && Store.deselectLayer()
    props.layer.toggleIsVisible()
  }

  const toggleIsLocked = (event) => {
    props.isSelected && Store.deselectLayer()
    props.layer.toggleIsLocked()
  }

  return (
    <Observer>
      {() => (
        <LayerContainer
          className={className}
          isSelected={props.isSelected}
          layerId={props.layer.id}
        >
          <LayerName
            onClick={onNameClick}
            name={props.layer.name}
            isSelected={props.isSelected}
          />
          <LayerActionIcons
            toggleVisibility={toggleVisibility}
            toggleIsLocked={toggleIsLocked}
            isLocked={props.isLocked}
            isVisible={props.isVisible}
            isSelected={props.isSelected}
          />
        </LayerContainer>
      )}
    </Observer>
  )
})
