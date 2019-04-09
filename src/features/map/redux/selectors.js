const _ = require('lodash')

export function getIncidentsWithID(state, id) {
  return state.map.data[id]
}

export function getIdBeingResolved(state) {
  return state.map.idBeingResolved
}

export function getIdBeingDeleted(state) {
  return state.map.idBeingDeleted
}