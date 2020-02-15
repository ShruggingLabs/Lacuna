import { types } from "mobx-state-tree"

const ImageType = types.model("ImageType", {
  url: types.optional(types.string, ""),
  width: types.optional(types.number, 0),
  height: types.optional(types.number, 0),
  size: types.optional(types.number, 0),
  fileUrl: types.optional(types.string, ""),
  fileName: types.optional(types.string, ""),
  filePath: types.optional(types.string, ""),
  styleOriginalHeight: types.optional(types.number, 0),
  styleOriginalWidth: types.optional(types.number, 0),
  styleHeightRatio: types.optional(types.number, 0)
})

export default ImageType
