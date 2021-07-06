import { TAG_CREATE, TAG_DELETE } from '../types/tag'

export default function tagsReducer(state = [], action) {
	switch (action.type) {
		case TAG_CREATE:
			return [...state, action.payload]
		case TAG_DELETE:
			return state.filter(item => item.id !== action.payload)
		default:
			return state
	}
}
