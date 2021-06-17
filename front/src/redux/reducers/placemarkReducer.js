import { PLACEMARK_CREATE, PLACEMARK_DELETE } from '../types/placemark'

export default function placemarksReducer(state = [], action) {
	switch (action.type) {
		case PLACEMARK_CREATE:
			return [...state, action.payload]
		case PLACEMARK_DELETE:
			return state.filter(item => item.id !== action.payload)
		default:
			return state
	}
}
