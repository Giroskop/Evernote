import { NOTEPAD_CREATE, NOTEPAD_DELETE, USER_NOTEPADS_LOADING, USER_NOTEPADS_LOADED } from '../types/notepad'

const notepadCreate = (notepad) => {
  return {
    type: NOTEPAD_CREATE,
    payload: notepad,
  }
}
export const userNotepadsLoadingAC = () => {
  return {
    type: USER_NOTEPADS_LOADING
  }
}
export const userNotepadsLoadedAC = (notepads) => {
  console.log(notepads)
  return {
    type: USER_NOTEPADS_LOADED,
    action: notepads
  }
}

const notepadDelete = (id) => {
  return {
    type: NOTEPAD_DELETE,
    payload: id
  }
}

export {notepadCreate, notepadDelete}
