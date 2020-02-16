import sleep from "sleepjs"
import { types, getParent, destroy, flow, detach } from "mobx-state-tree"
import makeInspectable from "mobx-devtools-mst"
import arrayMove from "array-move"
import ImageLayer from "./ImageLayer"
import TextLayer from "./TextLayer"
import BoxLayer from "./BoxLayer"
import { autorun, action, toJS } from "mobx"
import delay from "delay"
import { saveProject } from "../../services/database/data/saveProject"

const LayersUnion = types.union(ImageLayer, TextLayer, BoxLayer)

const StoreModel = {
  mainSelectedLayer: types.safeReference(LayersUnion),
  layers: types.array(LayersUnion),
  isLoadingImage: false,
  isLoadingFont: false,
  sortingLayerId: "",
  wasImageRecentlyLoaded: false,
  wasFontRecentlyLoaded: false,
  setWasProjectRecentlySaved: false,
  isCanvasGridVisible: true
}

const actions = (self) => {
  const setMainSelectedLayer = (id) => (self.mainSelectedLayer = id)

  const addTextLayer = () => {
    self.layers.push(TextLayer.create())
  }

  const addImageLayer = (layer) => {
    self.layers.push(ImageLayer.create(layer))
  }

  const addBoxLayer = () => {
    self.layers.push(
      BoxLayer.create({
        style: {
          backgroundColor: { r: 239, g: 53, b: 115, a: 1 }
        }
      })
    )
  }

  const selectLayer = (layer) => {
    // Thou shalt not select invisible layers.
    layer.isVisible && setMainSelectedLayer(layer.id)
  }

  const deselectLayer = () => {
    setMainSelectedLayer()
  }

  const removeLayer = flow(function*(layer) {
    detach(layer)
    yield sleep(500)
    destroy(layer)
  })

  const setIsLoadingImage = (value) => {
    self.isLoadingImage = value
    !value && handleRecentlyLoadedImage()
  }

  const setIsLoadingFont = (value) => {
    self.isLoadingFont = value
    !value && handleRecentlyLoadedFont()
  }

  const onLayerSortingEnd = ({ oldIndex, newIndex }) => {
    self.reorderLayer({ oldIndex, newIndex })
    self.sortingLayerId = ""
  }

  const onLayerSortingStart = ({ node }) => {
    const sortingLayerId = node.getAttribute("data-layer-id")
    self.sortingLayerId = sortingLayerId
  }

  const reorderLayer = ({ oldIndex, newIndex }) => {
    const layers = [...self.layers].reverse()
    const reorderedLayers = arrayMove(layers, oldIndex, newIndex)
    self.layers = [...reorderedLayers].reverse()
  }

  const afterCreate = () => {
    makeInspectable(self)
  }

  const toggleCanvasGrid = action(() => {
    self.isCanvasGridVisible = !self.isCanvasGridVisible
  })

  const handleRecentlyLoadedImage = flow(function*() {
    self.setWasImageRecentlyLoaded(true)
    yield delay(2500)
    self.setWasImageRecentlyLoaded(false)
  })

  const handleRecentlyLoadedFont = flow(function*() {
    self.setWasFontRecentlyLoaded(true)
    yield delay(2500)
    self.setWasFontRecentlyLoaded(false)
  })

  const save = flow(function*() {
    yield saveProject("2Ful8McNxcefAlD23AjrMh", toJS(self.layers))
    // TODO: Probably handle in component...
    self.setWasProjectRecentlySaved(true)
    yield sleep(2000)
    self.setWasProjectRecentlySaved(false)
  })

  return {
    onLayerSortingEnd,
    onLayerSortingStart,
    reorderLayer,
    setIsLoadingImage,
    setIsLoadingFont,
    afterCreate,
    addTextLayer,
    addImageLayer,
    addBoxLayer,
    selectLayer,
    deselectLayer,
    removeLayer,
    save,
    toggleCanvasGrid,

    setWasFontRecentlyLoaded: action((value) => {
      self.wasFontRecentlyLoaded = value
    }),

    setWasImageRecentlyLoaded: action((value) => {
      self.wasImageRecentlyLoaded = value
    }),

    setWasProjectRecentlySaved: action((value) => {
      self.wasProjectRecentlySaved = value
    })
  }
}

const views = (self) => {
  return {
    get allFontNames() {
      const set = self.layers.reduce((final, layer) => {
        if (layer.type === "text") {
          const font = layer.style.fontFamily
          final.add(font)
        }

        return final
      }, new Set())

      return Array.from(set)
    },

    // get allFonts() {
    //   const fonts = self.layers.map((layer) => {
    //     if (layer.type === "text") {
    //       return {
    //         font: layer.style.fontFamily,
    //         weights: [
    //           "100",
    //           "100i",
    //           "200",
    //           "200i",
    //           "300",
    //           "300i",
    //           "400",
    //           "400i",
    //           "500",
    //           "500i",
    //           "600",
    //           "600i",
    //           "700",
    //           "700i",
    //           "800",
    //           "800i",
    //           "900",
    //           "900i"
    //         ]
    //       }
    //     }
    //   })

    //   return fonts.filter(Boolean)
    // },

    get reversedLayers() {
      return [...self.layers].reverse()
    },

    get selectedLayer() {
      return self.layers.find((layer) => {
        return layer.id === self.mainSelectedLayerId
      })
    },

    isSelected(id) {
      return self.mainSelectedLayer?.id === id
    },

    layerById(id) {
      return self.layers.find((layer) => {
        return layer.id === id
      })
    }
  }
}

export default types
  .model("Store", StoreModel)
  .actions(actions)
  .views(views)
