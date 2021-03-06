import {
	PLACEMARK_CREATE,
	PLACEMARK_DELETE,
	PLACEMARK_EDIT,
	PLACEMARK_LOAD,
} from '../types/placemark'

export default function placemarksReducer(state = [], action) {
	switch (action.type) {
		case PLACEMARK_LOAD:
			return action.payload
		case PLACEMARK_CREATE:
			return [action.payload, ...state]
		case PLACEMARK_EDIT:
			const id = action.payload._id
			return state.map(item => {
				if (item._id === id) {
					return action.payload
				} else return item
			})
		case PLACEMARK_DELETE:
			return state.filter(item => item.id !== action.payload)
		default:
			return state
	}
}
