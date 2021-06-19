import {
	USER_SET,
	USER_LOGOUT,
	GET_CURRENT_USER,
	USER_CREATE,
	USER_UPDATE,
} from '../types/user'

const setUser = (obj) => {
  return {
    type: USER_SET,
    payload: obj
  }
}

export {setUser}

