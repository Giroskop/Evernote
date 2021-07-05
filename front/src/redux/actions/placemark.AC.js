import {PLACEMARK_LOAD, PLACEMARK_CREATE, PLACEMARK_DELETE } from '../types/placemark'

export const placemarksLoadAC = (payload) => {
  return {
    type: PLACEMARK_LOAD,
    payload: payload
  }
}
export const placemarkCreateAC = (payload) => {
  return {
    type: PLACEMARK_CREATE,
    payload: payload
  }
}
export const placemarkDeleteAC = (payload) => {
  return {
    type: PLACEMARK_DELETE,
    payload: payload
  }
}
