import { updateProject } from "."

export const normalizeLayers = (layers) => {
  return layers.map((layer) => {
    return JSON.parse(JSON.stringify(layer))
  })
}

export const saveProject = async (projectId, storeLayers = []) => {
  const layers = normalizeLayers(storeLayers)
  await updateProject(projectId, { layers })
}
