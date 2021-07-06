import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../types/auth'

export const userLoadingAC = () => {
  return {
    type: USER_LOADING
  }
}
export const userLoadedAC = (user) => {

  return {
    type: USER_LOADED,
    payload: user
  }
}
export const authErrorAC = () => {
  return {
    type: AUTH_ERROR
  }
}
export const userRegisterSuccessAC = (payload) => {

  return {
    type: REGISTER_SUCCESS,
    payload: payload
  }
}
export const userRegisterFailAC = () => {
  return {
    type: REGISTER_FAIL
  }
}
export const userLoginSuccessAC = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload
  }
}
export const userLoginFailAC = () => {
  return {
    type: LOGIN_FAIL
  }
}

export const userLogoutAC = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}
export const userLogoutFailAC = () => {
  return {
    type: LOGOUT_FAIL
  }
}
