import curry from "just-curry-it"
import qs from "qs"

const state = {
  // TODO: Make so it doesn't break if no process exists.
  strapiUrl: process.env.FETCH_STRAPI_URL || "http://localhost:1337"
}

const getAll = (type: string) => async () => {
  const url = `${state.strapiUrl}/${type}`
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const getCount = (type: string) => async () => {
  const url = `${state.strapiUrl}/${type}/count`
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const getById = (type: string) => async (id: string) => {
  const url = `${state.strapiUrl}/${type}/${id}`
  const response = await fetch(url)
  const json = await response.json()
  return json
}

const getWithQuery = (type: string) => async (query = {}) => {
  const url = `${base}/${type}?${qs.stringify(options)}`
  const response = await fetch(url)
  const json = await response.json()
  return json
}

const deleteById = (type: string) => async (id: string) => {
  const url = `${base}/${type}/${id}`
  const response = await fetch(url, { method: "DELETE" })
  const json = await response.json()
  return json
}

export const create = (type: string) => async () => {
  const url = `${state.strapiUrl}/${type}/count`
  const response = await fetch(url, { method: "POST" })
  const json = await response.json()
  return json
}

export const updateById = (type: string) => async (id: string) => {
  const url = `${state.strapiUrl}/${type}/count`
  const response = await fetch(url, { method: "PUT" })
  const json = await response.json()
  return json
}

export const contentType = (type: string) => {
  return {
    getAll: getAll(type),
    getById: getById(type),
    getCount: getCount(type),
    getWithQuery: getWithQuery(type),
    deleteById: deleteById(type),
    create: create(type),
    updateById: updateById(type)
  }
}
