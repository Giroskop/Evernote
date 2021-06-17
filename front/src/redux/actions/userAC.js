import {
	USER_LOGIN,
	USER_LOGOUT,
	GET_CURRENT_USER,
	USER_CREATE,
	USER_UPDATE,
} from '../types/user'

async function userLogin(obj) {
  const res = await fetch('http://127.0.0.1:3001/auth/signIn')
}
