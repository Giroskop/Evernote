import {
	PLACEMARK_FORM_OPEN,
	PLACEMARK_FORM_CLOSE,
	PLACEMARK_EDIT_OPEN,
	PLACEMARK_EDIT_CLOSE,
	BACKLAYOUT_CLOSE,
	BACKLAYOUT_OPEN,
  ALL_MODAL_CLOSE,
} from '../types/modal'

export default function modalReducer(state = {}, action) {
	switch (action.type) {
		case ALL_MODAL_CLOSE:
			return {
				backLayoutActive: false,
				placemarkFormActive: false,
				placemarkEditActive: false,
			}
		case BACKLAYOUT_OPEN:
			return { ...state, backLayoutActive: true }
		case BACKLAYOUT_CLOSE:
			return { ...state, backLayoutActive: false }
		case PLACEMARK_FORM_OPEN:
			return { ...state, backLayoutActive: true, placemarkFormActive: true }
		case PLACEMARK_FORM_CLOSE:
			return { ...state, backLayoutActive: false, placemarkFormActive: false }
		case PLACEMARK_EDIT_OPEN:
			return { ...state, backLayoutActive: true, placemarkEditActive: true }
		case PLACEMARK_EDIT_CLOSE:
			return { ...state, backLayoutActive: false, placemarkEditActive: false }
		default:
			return state
	}
}
