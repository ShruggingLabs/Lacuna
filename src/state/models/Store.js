import { types, getParent, destroy, flow } from "mobx-state-tree"
import makeInspectable from "mobx-devtools-mst"
import arrayMove from "array-move"
import ImageLayer from "./ImageLayer"
import TextLayer from "./TextLayer"
import BoxLayer from "./BoxLayer"
import { autorun, action } from "mobx"
import delay from "delay"

const LayersUnion = types.union(ImageLayer, TextLayer, BoxLayer)

const StoreModel = {
  mainSelectedLayer: types.safeReference(LayersUnion),
  layers: types.array(LayersUnion),
  isLoadingImage: false,
  isLoadingFont: false,
  sortingLayerId: "",
  wasImageRecentlyLoaded: false,
  wasFontRecentlyLoaded: false
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
          backgroundColor: { r: 234, g: 231, b: 248, a: 1 }
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

  const removeLayer = (layer) => {
    destroy(layer)
  }

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

    setWasFontRecentlyLoaded: action((value) => {
      self.wasFontRecentlyLoaded = value
    }),

    setWasImageRecentlyLoaded: action((value) => {
      self.wasImageRecentlyLoaded = value
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
