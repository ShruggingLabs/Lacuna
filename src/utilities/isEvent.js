const failsObjectCriteria = (target) => {
  const isFalsey = !target
  const isArray = Array.isArray(target)
  const isString = typeof target == "string"
  const isNumber = typeof target == "number"
  const isNotObject = typeof target !== "object"

  // console.log({ isFalsey, isArray, isString, isNumber, isNotObject })
  return isFalsey || isArray || isString || isNumber || isNotObject
}

export const isEvent = (target) => {
  if (failsObjectCriteria(target)) {
    return false
  }

  const hasNativeEventProperty = target.hasOwnProperty("nativeEvent")
  const nativeEventIsEvent = target.nativeEvent instanceof Event
  return hasNativeEventProperty && nativeEventIsEvent
}
