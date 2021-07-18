import { put, call, takeEvery, select } from 'redux-saga/effects'
import { clearErrorAC, getErrorAC } from '../actions/errorAC'
import { userIdSelector } from './selectors'
import axios from 'axios'

import {
	PLACEMARKS_LOAD_SAGA,
	PLACEMARK_CREATE_SAGA,
	PLACEMARK_DELETE_SAGA,
	PLACEMARK_EDIT_SAGA,
} from '../types/placemark'
import {
	placemarkCreateAC,
	placemarkEditAC,
	placemarksLoadAC,
} from '../actions/placemark.AC'

export const placemarksLoadSagaAC = () => {
	return {
		type: PLACEMARKS_LOAD_SAGA,
	}
}
export const placemarkCreateSagaAC = payload => {
	return {
		type: PLACEMARK_CREATE_SAGA,
		payload: payload,
	}
}
export const placemarkEditSagaAC = payload => {
  console.log('payload')
	return {
		type: PLACEMARK_EDIT_SAGA,
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
		[
			PLACEMARKS_LOAD_SAGA,
			PLACEMARK_EDIT_SAGA,
			PLACEMARK_CREATE_SAGA,
			PLACEMARK_DELETE_SAGA,
		],
		placemarkWorker
	)
}

function* placemarkWorker(action) {
	switch (action.type) {
		case PLACEMARKS_LOAD_SAGA:
			try {
				const placemarks = yield call(loadPlacemarksFromServer)
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
		case PLACEMARK_EDIT_SAGA:
			console.log('---')
			try {
				const placemark = yield call(placemarkEdit, action.payload)
				yield put(placemarkEditAC(placemark.data))
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
		case PLACEMARK_CREATE_SAGA:
			console.log('test1')
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

function loadPlacemarksFromServer() {
	return axios.get(`/api/placemark`)
}

function placemarkCreate(fd, userId) {
	fd.append('userId', userId)
	return axios.post('/api/placemark', fd)
}
function placemarkEdit(values) {
	console.log(values, 'in saga')
	const fd = new FormData()
	for (let i in values) {
		fd.append(i, values[i])
	}
	return axios.patch(`/api/placemark`, fd)
}
function placemarkDelete(fd) {
	return axios.post(`/api/placemark${fd.notepadId}`, fd)
}
