import { put, call, takeEvery, select } from 'redux-saga/effects'
import { clearErrorAC, getErrorAC } from '../actions/errorAC'
// import {
// 	NOTEPAD_CREATE_SAGA,
// 	NOTEPADS_LOAD_SAGA,
// } from '../types/notepad'
import { userIdSelector } from './selectors'
import axios from 'axios'

import { PLACEMARKS_LOAD_SAGA, PLACEMARK_CREATE_SAGA, PLACEMARK_DELETE_SAGA } from '../types/placemark'
import { placemarkCreateAC, placemarksLoadAC } from '../actions/placemark.AC'

export const placemarksLoadSagaAC = (payload) => {
  console.log(payload, 'ID NOTEPAD')
	return {
		type: PLACEMARKS_LOAD_SAGA,
    payload: payload,
	}
}
export const placemarkCreateSagaAC = payload => {
	return {
		type: PLACEMARK_CREATE_SAGA,
		payload: payload,
	}
}
export const placemarkDeleteSagaAC = payload => {
	return {
		type: PLACEMARK_DELETE_SAGA,
		payload: payload,
	}
}

export function* placemarkWatcher() {
	yield takeEvery(
		[PLACEMARKS_LOAD_SAGA, PLACEMARK_CREATE_SAGA, PLACEMARK_DELETE_SAGA],
		placemarkWorker
	)
}

function* placemarkWorker(action) {
	switch (action.type) {
		case PLACEMARKS_LOAD_SAGA:
			try {
				// const userId = yield select(userIdSelector)
				const placemarks = yield call(loadPlacemarksFromServer, action.payload)
				yield put(placemarksLoadAC(placemarks.data.reverse()))
			} catch (error) {
				yield put(
					getErrorAC(
						error.response.status,
						error.response.data,
						'USER_PLACEMARKS_LOAD_FAIL'
					)
				)
			}
			break
		case PLACEMARK_CREATE_SAGA:
			try {
				const userId = yield select(userIdSelector)
				const placemark = yield call(placemarkCreate, action.payload, userId)
				yield put(placemarkCreateAC(placemark.data))
			} catch (error) {
				yield put(
					getErrorAC(
						error.response.status,
						error.response.data,
						'USER_PLACEMARK_CREATE_FAIL'
					)
				)
			}
      break
		case PLACEMARK_DELETE_SAGA:
			try {
				const userId = yield select(userIdSelector)
				const notepad = yield call(placemarkDelete, action.payload, userId)
				yield put(placemarkCreateAC(notepad.data))
			} catch (error) {
				yield put(
					getErrorAC(
						error.response.status,
						error.response.data,
						'USER_PLACEMARK_CREATE_FAIL'
					)
				)
			}
      break
		default:
			break
	}
}

function loadPlacemarksFromServer(notepadId) {
	// const userId = yield select(userIdSelector)
	const config = {
		headers: {
			'Content-Type': 'application/json',
		}
	}
	return axios.get(`/api/notepad/${notepadId}`)
}

function placemarkCreate(fd, userId) {
	fd.append('userId', userId)
	return axios.post('/api/placemark', fd)
}
function placemarkDelete(fd, userId) {
	fd.append('userId', userId)
	return axios.post('/api/placemark', fd)
}
