import { PLACEMARK_FORM_OPEN, PLACEMARK_FORM_CLOSE, BACKLAYOUT_OPEN, BACKLAYOUT_CLOSE, PLACEMARK_EDIT_OPEN, PLACEMARK_EDIT_CLOSE } from "../types/modal";

export const backLayoutOpen = () => {
  return {
    type: BACKLAYOUT_OPEN
  }
}
export const backLayoutClose = () => {
  return {
    type: BACKLAYOUT_CLOSE
  }
}
export const placemarkEditOpen = () => {
  return {
    type: PLACEMARK_EDIT_CLOSE
  }
}
export const placemarkEditClose = () => {
  return {
    type: PLACEMARK_EDIT_OPEN
  }
}

