import GET_CURRENT_USER from '../types/user'
import { USER_SET, USER_LOGOUT, USER_CREATE, USER_UPDATE } from '../types/user'

export default function userReducer(state = {}, action) {
	switch (action.type) {
		case USER_SET:
			return {
				...action.payload,
			}
		case USER_LOGOUT:
			return {}
		case USER_CREATE:
			return {}
		case USER_UPDATE:
			return {}

		default:
			return state
	}
}


