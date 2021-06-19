import { NOTEPAD_CREATE, NOTEPAD_DELETE } from '../types/notepad'

const notepadCreate = (notepad) => {
  return {
    type: NOTEPAD_CREATE,
    payload: notepad,
  }
}

const notepadDelete = (id) => {
  return {
    type: NOTEPAD_DELETE,
    payload: id
  }
}

export {notepadCreate, notepadDelete}
