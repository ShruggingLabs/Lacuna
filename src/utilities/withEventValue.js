import { isEvent } from "./isEvent"

// If the argument is an Event, extract the event.target.value
// and call the func with the value as the first argument and
// event as the second. If the argument is not an event, just
// pass it along to the func.

export const withEventValue = (func) => {
  return (data) => {
    return isEvent(data) ? func(data.target.value, data) : func(data)
  }
}
