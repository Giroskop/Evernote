import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
} from '../types/auth'
export default function authReducer(state = {}, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			}
		case USER_LOADED:

			return {
				...state,
				isAuth: true,
				isLoading: false,
				user: action.payload,
			}
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token)
			return {
				...state,
				isAuth: true,
				isLoading: false,
				...action.payload,
			}
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
      localStorage.removeItem('token')
			return {
				...state,
				isAuth: false,
				isLoading: true,
				token: null,
        user: null,
			}
		default:
			return state
	}
}
