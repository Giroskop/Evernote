import { put, call, takeEvery, select } from 'redux-saga/effects'
import { clearErrorAC, getErrorAC } from '../actions/errorAC'
import { NOTEPAD_CREATE_SAGA, NOTEPADS_LOAD_SAGA } from '../types/notepad'
import { userIdSelector } from './selectors'
import axios from 'axios'
import {
	notepadsLoadingAC,
	notepadsLoadedAC,
	notepadCreateAC,
} from '../actions/notepadAC'

export const notepadsLoadSagaAC = () => {
	return {
		type: NOTEPADS_LOAD_SAGA,
	}
}
export const notepadCreateSagaAC = value => {
	return {
		type: NOTEPAD_CREATE_SAGA,
		payload: value,
	}
}

export function* notepadWatcher() {
	yield takeEvery([NOTEPADS_LOAD_SAGA, NOTEPAD_CREATE_SAGA], notepadWorker)
}

function* notepadWorker(action) {
	switch (action.type) {
		case NOTEPADS_LOAD_SAGA:
			yield put(notepadsLoadingAC())
			try {
				const userId = yield select(userIdSelector)
				const notepads = yield call(loadNotepadsFromServer, userId)
				yield put(notepadsLoadedAC(notepads.data.reverse()))
			} catch (error) {
				yield put(
					getErrorAC(
						error.response.status,
						error.response.data,
						'USER_NOTEPADS_LOAD_FAIL'
					)
				)
			}
			break
		case NOTEPAD_CREATE_SAGA:
			yield put(notepadsLoadingAC())
			try {
				const userId = yield select(userIdSelector)
				console.log(userId, '..............................')
				const notepad = yield call(notepadCreate, action.payload, userId)
				yield put(notepadCreateAC(notepad.data))
			} catch (error) {
				yield put(
					getErrorAC(
						error.response.status,
						error.response.data,
						'USER_NOTEPADS_LOAD_FAIL'
					)
				)
			}
		default:
			break
	}
}

function loadNotepadsFromServer(userId) {
	// const userId = yield select(userIdSelector)
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			authorId: userId,
		},
	}
	return axios.get('/api/notepad', config)
}
function notepadCreate(form, userId) {
	console.log(userId, 'userIddddddddddddd')
	console.log(form, 'FOOOOOOOORM')
  let fd = new FormData()
  fd.append('name', form.name)
  fd.append('image', form.image)
	// const body = {
	// 	body: {
	// 		name: form.name,
	// 		image: form.image,
	// 		userId: userId,
	// 	},
	// }
  const body = fd
/* 	const config = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
		},
	} */
	return axios.post('/api/notepad', body)
}
