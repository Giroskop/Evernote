import { CLEAR_ERROR, GET_ERROR } from "../types/error"


export const getErrorAC = (status, message, id) => {
  return {
    type: GET_ERROR,
    payload: {status, message, id}
  }
}

export const clearErrorAC = () => {
  return {
    type: CLEAR_ERROR
  }
}
