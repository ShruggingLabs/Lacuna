import { types, getParent, destroy, detach, flow } from "mobx-state-tree"
import makeInspectable from "mobx-devtools-mst"

import { withEventValue } from "#utilities/withEventValue"
import { nanoid } from "#utilities/nanoid"
import { reaction, action } from "mobx"

const LAYER_TYPES_ENUM = types.enumeration(["text", "image", "box"])

const LayerModel = {
  id: types.optional(types.identifier, () => nanoid()),
  name: types.optional(types.string, "layer"),
  type: LAYER_TYPES_ENUM,
  createdDate: types.optional(types.number, () => Date.now()),
  updatedDate: types.optional(types.number, () => Date.now()),
  createdBy: types.optional(types.string, "abc123"),
  updatedBy: types.optional(types.string, "abc123"),
  isVisible: types.optional(types.boolean, true),
  isLocked: types.optional(types.boolean, false),
  isSelected: types.optional(types.boolean, false),
  isDeleting: types.optional(types.boolean, false),
  isDeleted: types.optional(types.boolean, false),
  foo: 0,
  scaleX: 1,
  scaleY: 1,
  textDataLink: ""
}

const actions = (self) => {
  const setName = (value) => (self.name = value)
  const toggleIsVisible = (value = !self.isVisible) => (self.isVisible = value)
  const toggleIsLocked = (value = !self.isLocked) => (self.isLocked = value)
  const toggleIsSelected = (value = !self.isSelected) => (self.isSelected = value)
  const setStackIndex = (value) => (self.stackIndex = value)
  const setCreatedDate = (value) => (self.createdDate = value)
  const setUpdatedDate = (value) => (self.updatedDate = value)
  const setCreatedBy = (value) => (self.createdBy = value)
  const setUpdatedBy = (value) => (self.updatedBy = value)
  const setFoo = () => (self.foo += 1)

  const setTextDataLink = (key) => {
    self.textDataLink = key
  }

  const setScaleX = (value) => (self.scaleX = value)
  const setScaleY = (value) => (self.scaleY = value)

  const reposition = (attributes) => {
    self.style.setTop(attributes.y)
    self.style.setLeft(attributes.x)
  }

  const resize = (attributes) => {
    self.style.setHeight(attributes.y)
    self.style.setWidth(attributes.x)
  }

  const trash = flow(function*() {
    getParent(self, 2).removeLayer(self)
  })

  const remove = action(() => {
    getParent(self, 2).removeLayer(self)
  })

  const afterCreate = () => {
    makeInspectable(self)
  }

  return {
    setTextDataLink,
    setFoo,
    trash,
    setScaleX,
    setScaleY,
    reposition,
    resize,
    remove,
    setName,
    toggleIsVisible,
    toggleIsLocked,
    toggleIsSelected,
    setStackIndex,
    setCreatedDate,
    setUpdatedDate,
    setCreatedBy,
    setUpdatedBy
  }
}

const views = (self) => {
  return {}
}

export default types
  .model("Layer", LayerModel)
  .actions(actions)
  .views(views)
