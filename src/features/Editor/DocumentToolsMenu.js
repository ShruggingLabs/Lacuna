import { Pane } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import { PanelMenu } from "../../components/PanelMenu/PanelMenu"

import styles from "./DocumentToolsMenu.module.css"
import { Icon } from "../../components/Icon"
import Store from "../../state"
import { saveAs } from "file-saver"
import Spacer from "react-spacer"

export const DocumentToolsMenu = observer((props) => {
  const isCanvasGridVisible = Store.isCanvasGridVisible

  return (
    <Pane className={styles.DocumentToolsMenu}>
      <Spacer width='12px' />

      <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
        <Icon
          iconSize='14px'
          className={styles.icon}
          icon='paragraph'
          title='Add Text Layer'
          htmlTitle='Add Text Layer'
          onClick={() => Store.addTextLayer()}
        />
      </Pane>

      <Spacer width='12px' />

      <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
        <Icon
          iconSize='14px'
          className={styles.icon}
          icon='widget'
          title='Add Box Layer'
          htmlTitle='Add Box Layer'
          onClick={() => Store.addBoxLayer()}
        />
      </Pane>

      <Spacer width='12px' />

      <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
        <Icon
          iconSize='14px'
          className={styles.icon + " " + styles.disabledIcon}
          disabled
          icon='media'
          title='Add Image Layer'
          htmlTitle='Add Image Layer'
          // onClick={() => Store.addImageLayer()}
        />
      </Pane>

      <Spacer width='12px' />

      <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
        <Icon
          iconSize='14px'
          className={styles.icon}
          icon='layout-linear'
          title='Add Image Row Layer'
          htmlTitle='Add Image Row Layer'
          onClick={() => Store.addImageRowLayer()}
        />
      </Pane>

      <Spacer width='12px' />
    </Pane>
  )
})

window.exportToImage = () => {
  var canvas = document.querySelector("#Canvas canvas")
  canvas.toBlob(function(blob) {
    saveAs(blob, "pretty-image.jpg")
  })
}
