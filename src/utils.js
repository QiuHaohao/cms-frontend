const _ = require('lodash')

export function postalCodeToCoordinates(postalCode) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyBNocvBuCiHPeTLlL6W8F2Kza2wAOY75eM`
  return fetch(url)
    .then(res => res.json())
    .then(getCoordinatesFromRes)
}

function getCoordinatesFromRes({ results, status }) {
  const elidgableResults = _.filter(
    results,
    isElidgableResult
  )
  if (elidgableResults.length === 0) {
    return null
  }
  const firstElidgableResult = elidgableResults[0]
  return firstElidgableResult.geometry.location
}

function isElidgableResult(result) {
  return isPostalCode(result) && isSingaporeAddress(result)
}

function isPostalCode({ types }) {
  return types.includes("postal_code")
}

function isSingaporeAddress({ formatted_address }) {
  return formatted_address.search("Singapore") !== -1
}