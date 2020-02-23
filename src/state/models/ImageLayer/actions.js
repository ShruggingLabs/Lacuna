export const actions = (self) => {
  const setImageUrl = (url) => {
    self.imageUrl = url
  }

  const setImage = (image) => {
    self.image = image
  }

  const setImageUrlDataLink = (key) => {
    self.imageUrlDataLink = key
  }

  return {
    setImage,
    setImageUrlDataLink,
    setImageUrl
  }
}
