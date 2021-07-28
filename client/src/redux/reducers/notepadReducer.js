import {
	NOTEPAD_CREATE,
	NOTEPAD_DELETE,
	NOTEPADS_LOADED,
	NOTEPADS_LOADING,
  NOTEPAD_CHANGE_POSITION,
	NOTEPAD_LOADED
} from '../types/notepad'

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
		case NOTEPAD_CHANGE_POSITION:
      console.log(action.payload, 'payload<<<<')
			return state.map(item => {
        if (item.position === action.payload.replacedNotepadId) {
          return {...item, position: action.payload.draggedNotepadId}
        }
        if (item.position === action.payload.draggedNotepadId) {
          return {...item, position: action.payload.replacedNotepadId}
        }
        return item
      })
		default:
			return state
	}
}
