import GET_CURRENT_USER from '../types/user'
import { USER_SET, USER_LOGOUT, USER_CREATE, USER_UPDATE } from '../types/user'

export default function userReducer(state = {}, action) {
	switch (action.type) {
		case USER_SET:
      console.log(state)
			return {
				...state,
				notepads: action.payload.notepads,
				placemarks: action.payload.placemarks,
				tags: action.payload.tags,
			}
		case USER_LOGOUT:
			return {}
		case USER_CREATE:
			return {
				...state,
				notepads: action.payload.notepads,
				placemarks: action.payload.placemarks,
				tags: action.payload.tags,
			}
		case USER_UPDATE:
			return {
				...state,
				notepads: action.payload.notepads,
				placemarks: action.payload.placemarks,
				tags: action.payload.tags,
			}

		default:
			return state
	}
}

/* name: {
  firstName: String,
  lastName: String,
},
email: String,
password: String,
created: Date
}) */
