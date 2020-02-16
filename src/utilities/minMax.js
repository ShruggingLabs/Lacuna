export const minMax = (min, max) => (subject) => {
  return Math.min(Math.max(subject, min), max)
}
