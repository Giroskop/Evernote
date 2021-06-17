import { NOTEPAD_CREATE, NOTEPAD_DELETE } from '../types/notepad'

export default function notepadsReducer(state = [], action) {
	switch (action.type) {
		case NOTEPAD_CREATE:
      return [...state, action.payload]
		case NOTEPAD_DELETE:
      return state.filter(item => item.id !== action.payload)
		default:
			return state
	}
}
