import { updateProject } from "./"

export const normalizeLayers = (layers) => {
  return layers.map((layer) => {
    return JSON.parse(JSON.stringify(layer))
  })
}

export const saveProject = async (projectId, storeLayers = [], projectDataset) => {
  const layers = normalizeLayers(storeLayers)
  await updateProject(projectId, { layers, projectDataset })
}
