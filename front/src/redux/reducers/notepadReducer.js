import { NOTEPAD_CREATE, NOTEPAD_DELETE, USER_NOTEPADS_LOADED, USER_NOTEPADS_LOADING } from '../types/notepad'

export default function notepadsReducer(state = [], action) {

	switch (action.type) {
    case USER_NOTEPADS_LOADING:
      return state
    case USER_NOTEPADS_LOADED:
      return action.payload
		case NOTEPAD_CREATE:
      return [...state,  action.payload]
		case NOTEPAD_DELETE:
      return state.filter(item => item.id !== action.payload)
		default:
			return state
	}
}
