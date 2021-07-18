import { NOTEPAD_CREATE, NOTEPAD_DELETE, NOTEPADS_LOADING, NOTEPADS_LOADED } from '../types/notepad'
import { PLACEMARK_EDIT } from '../types/placemark'

export const notepadCreateAC = (notepad) => {
  return {
    type: NOTEPAD_CREATE,
    payload: notepad,
  }
}
export const notepadEditAC = (notepad) => {
  return {
    type: PLACEMARK_EDIT,
    payload: notepad,
  }
}
export const notepadsLoadingAC = () => {
  return {
    type: NOTEPADS_LOADING
  }
}
export const notepadsLoadedAC = (notepads) => {
  return {
    type: NOTEPADS_LOADED,
    payload: notepads
  }
}

export const notepadDeleteAC = (id) => {
  return {
    type: NOTEPAD_DELETE,
    payload: id
  }
}


