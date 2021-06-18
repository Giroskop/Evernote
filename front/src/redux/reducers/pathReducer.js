import { PATH_CHANGE, PATH_GET } from '../types/path'

export default function pathReducer(state = '', action) {
	switch (action.type) {
		case PATH_CHANGE:
			return action.payload
		default:
			return state
	}
}
