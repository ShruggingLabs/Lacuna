import { Pane } from "evergreen-ui"
import { observer } from "mobx-react"
import * as React from "react"
import { PanelMenu } from "../../components/PanelMenu/PanelMenu"

import styles from "./DocumentToolsMenu.module.css"
import { Icon } from "../../components/Icon"
import Store from "../../state"
import { saveAs } from "file-saver"

export const DocumentToolsMenu = observer((props) => {
  const isCanvasGridVisible = Store.isCanvasGridVisible

  return (
    <Pane className={styles.DocumentToolsMenu}>
      <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
        <Icon
          className={styles.icon}
          icon='paragraph'
          title='Add Text Layer'
          htmlTitle='Add Text Layer'
          onClick={() => Store.addTextLayer()}
        />
      </Pane>

      <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
        <Icon
          className={styles.icon}
          icon='widget'
          title='Add Box Layer'
          htmlTitle='Add Box Layer'
          onClick={() => Store.addBoxLayer()}
        />
      </Pane>

      <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
        <Icon
          className={styles.icon + " " + styles.disabledIcon}
          disabled
          icon='media'
          title='Add Image Layer'
          htmlTitle='Add Image Layer'
          // onClick={() => Store.addImageLayer()}
        />
      </Pane>

      <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
        <Icon
          className={styles.icon}
          icon='grid'
          title='Toggle Grid'
          htmlTitle='Toggle Grid'
          onClick={() => Store.toggleCanvasGrid()}
        />
      </Pane>

      <Pane display='flex' justifyContent='center' alignItems='center' width='36px' height='36px'>
        <Icon
          className={styles.icon}
          icon='floppy-disk'
          title='Save'
          htmlTitle='Save'
          onClick={Store.save}
        />
      </Pane>
    </Pane>
  )
})

window.exportToImage = () => {
  var canvas = document.querySelector("#Canvas canvas")
  canvas.toBlob(function(blob) {
    saveAs(blob, "pretty-image.jpg")
  })
}
