import sleep from "sleepjs"
import data from "./data"
import { types, getParent, destroy, flow, detach } from "mobx-state-tree"
import makeInspectable from "mobx-devtools-mst"
import arrayMove from "array-move"
import ImageLayer from "./ImageLayer"
import TextLayer from "./TextLayer"
import BoxLayer from "./BoxLayer"
import { autorun, action, toJS } from "mobx"
import delay from "delay"
import { saveProject } from "#services/database/data/saveProject"
import { getProject } from "#services/database/data"

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
  isCanvasGridVisible: true,
  fontsLoaded: 0,
  documentZoomLevel: 0.5,
  isDatasetManagerVisible: false,
  projectDataset: JSON.stringify(data)
}

const backupState = {
  projectDataset: data
}

const actions = (self) => {
  const toggleDatasetManager = (value = !self.isDatasetManagerVisible) => {
    self.isDatasetManagerVisible = value
  }

  const updateProjectDataset = (dataset) => {
    self.projectDataset = dataset
  }

  const setMainSelectedLayer = (id) => (self.mainSelectedLayer = id)

  const setDocumentZoomLevel = (n) => {
    self.documentZoomLevel = Number(Number.parseFloat(n).toFixed(2))
  }

  const zoomInDocument = () => {
    setDocumentZoomLevel(self.documentZoomLevel + 0.05)
  }

  const zoomOutDocument = () => {
    setDocumentZoomLevel(self.documentZoomLevel - 0.05)
  }

  const addTextLayer = () => {
    self.layers.push(
      TextLayer.create({
        style: {
          height: "auto"
        }
      })
    )
  }

  const addImageLayer = (layer) => {
    self.layers.push(ImageLayer.create(layer))
  }

  const addLoadedFont = () => {
    self.fontsLoaded += 1
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
    typeof layer === "string"
      ? setMainSelectedLayer(layer)
      : layer.isVisible && setMainSelectedLayer(layer.id)
  }

  const deselectLayer = () => {
    setMainSelectedLayer()
  }

  const removeLayer = flow(function*(layer) {
    self.deselectLayer()
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
    yield saveProject("2Ful8McNxcefAlD23AjrMh", toJS(self.layers), self.projectDataset)
    self.setWasProjectRecentlySaved(true)
    yield sleep(2000)
    self.setWasProjectRecentlySaved(false)
  })

  const loadProject = flow(function*(projectId) {
    const project = yield getProject(projectId)

    // updateProjectDataset(project.projectDataset)

    for (const layer of project.layers) {
      layer.type === "text" && self.layers.push(TextLayer.create(layer))
      layer.type === "box" && self.layers.push(BoxLayer.create(layer))
      layer.type === "image" && self.layers.push(ImageLayer.create(layer))
    }
  })

  return {
    addLoadedFont,
    toggleCanvasGrid,
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
    loadProject,
    save,
    setDocumentZoomLevel,
    zoomInDocument,
    zoomOutDocument,
    toggleDatasetManager,
    updateProjectDataset,

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
    },

    get projectDatasetJson() {
      return JSON.parse(self.projectDataset)
    },

    get projectDatasetColumnNames() {
      const dataset = self.projectDataset
      return Object.keys(backupState.projectDataset[0])
    },

    getDemoDataRow() {
      const dataset = self.projectDataset
      return backupState.projectDataset[0]
    }
  }
}

export default types
  .model("Store", StoreModel)
  .actions(actions)
  .views(views)
