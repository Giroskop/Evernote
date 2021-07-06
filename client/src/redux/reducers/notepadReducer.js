import { NOTEPAD_CREATE, NOTEPAD_DELETE, NOTEPADS_LOADED, NOTEPADS_LOADING, NOTEPAD_LOADED } from '../types/notepad'

export default function notepadsReducer(state = [], action) {

	switch (action.type) {
    case NOTEPADS_LOADING:
      return state
    case NOTEPADS_LOADED:
      return action.payload
		case NOTEPAD_CREATE:
      return [action.payload, ...state]
		case NOTEPAD_DELETE:
      return state.filter(item => item.id !== action.payload)
		default:
			return state
	}
}
