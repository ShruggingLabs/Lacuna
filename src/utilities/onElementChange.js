const MUTATION_OBSERVER_CONFIG = {
  attributes: true,
  attributeOldValue: true,
  characterData: true,
  characterDataOldValue: true,
  childList: true,
  subtree: true
}

export const onElementChange = (target, handler) => {
  const observer = new MutationObserver((mutations) => {
    handler(mutations)
  })

  observer.observe(target, MUTATION_OBSERVER_CONFIG)

  // NOTE: Arrow function is needed for some funky reason
  // or else "Illegal Invocation" gets throws when React.useEffect
  // calls dusconnect().
  return () => observer.disconnect()
}
