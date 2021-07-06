import { GET_ERROR, CLEAR_ERROR} from '../types/error'

export default function errorReducer(state = {}, action) {
	switch (action.type) {
		case GET_ERROR:
			return {
				message: action.payload.message,
				status: action.payload.status,
				id: action.payload.id,
			}
		case CLEAR_ERROR:
			return {
        message: '',
        status: null,
        id: null,
      }
		default:
			return state
	}
}
