import generate from 'nanoid/generate'

export const nanoid = () => {
  return generate('1234567890abcdefghjkmnpqrstuvwxyz', 8)
}
