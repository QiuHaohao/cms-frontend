export function setAsResolvedStatus(state, id, resolved_status) {
  return id 
    ? {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            resolved_status
          }
        }
      }
    : state
}

export function setAsResolved(state, id) {
  return setAsResolvedStatus(state, id, "resolve")
}

export function setAsDeleted(state, id) {
  return setAsResolvedStatus(state, id, "deleted")
}