import { put, call, takeEvery, select } from 'redux-saga/effects'
import { clearErrorAC, getErrorAC } from '../actions/errorAC'
import { tokenSelector } from './selectors'
import { USER_NOTEPADS_LOAD_SAGA } from '../types/notepad'
import { userSelector } from './selectors'
import axios from 'axios'
import { userNotepadsLoadedAC, userNotepadsLoadingAC } from '../actions/notepadAC'

export const userNotepadsLoadAC = () => {
	return {
		type: USER_NOTEPADS_LOAD_SAGA,
	}
}
export function* notepadWatcher() {
	yield takeEvery([USER_NOTEPADS_LOAD_SAGA], notepadWorker)
}

function* notepadWorker(action) {
	switch (action.type) {
    case USER_NOTEPADS_LOAD_SAGA:
      yield put(userNotepadsLoadingAC())
			try {
				const notepads = yield call(loadNotepadsFromServer)
        yield put(userNotepadsLoadedAC(notepads))
			} catch (error) {
				yield put(getErrorAC(error.response.status, error.response.data, 'USER_NOTEPADS_LOAD_FAIL'))
			}
			break
		default:
			break
	}
}
function* loadNotepadsFromServer() {
  const user = select(userSelector)
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
    params: {
      authorId: user._id
    }
	}

	yield axios.get('/api/notepad', config)
}
