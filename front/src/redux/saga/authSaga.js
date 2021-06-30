// import {put, takeEvery, call } from 'redux-saga'
import { put, call, takeEvery, select } from 'redux-saga/effects'
import {
	userLoadingAC,
	userLoadedAC,
	authErrorAC,
	userRegisterSuccessAC,
	userRegisterFailAC,
  userLoginSuccessAC,
  userLoginFailAC,
} from '../actions/authAC'
import {
	REGISTER_FAIL,
	USER_LOAD_SAGA,
	USER_LOGIN_SAGA,
	USER_REGISTER_SAGA,
} from '../types/auth'
import { clearErrorAC, getErrorAC } from '../actions/errorAC'
import { tokenSelector } from './selectors'
import axios from 'axios'

export const userLoadSagaAC = () => {
	return {
		type: USER_LOAD_SAGA,
	}
}
export const userRegisterSagaAC = values => {
	return {
		type: USER_REGISTER_SAGA,
		payload: values,
	}
}
export const userLoginSagaAC = values => {
	return {
		type: USER_LOGIN_SAGA,
		payload: values,
	}
}
export function* userWatcher() {
	yield takeEvery(
		[USER_LOAD_SAGA, USER_REGISTER_SAGA, USER_LOGIN_SAGA],
		userWorker
	)
}

function* userWorker(action) {
	switch (action.type) {
		case USER_LOAD_SAGA:
			yield put(userLoadingAC())
			try {
				const user = yield call(loadUserFromServer)
				yield put(userLoadedAC(user))
			} catch (error) {
				yield put(getErrorAC(error.response.status, error.response.data))
				yield put(authErrorAC())
			}
			break
		case USER_REGISTER_SAGA:
			try {
				const res = yield call(registerUser, action.payload)
				yield put(userRegisterSuccessAC(res.data))
			} catch (error) {
				yield put(
					getErrorAC(error.response.status, error.response.data, REGISTER_FAIL)
				)
				yield put(userRegisterFailAC())
			}
			break
		case USER_LOGIN_SAGA:
			try {
				const res = yield call(loginUser, action.payload)
				yield put(userLoginSuccessAC(res.data))
			} catch (error) {
				yield put(
					getErrorAC(error.response.status, error.response.data, REGISTER_FAIL)
				)
				yield put(userLoginFailAC())
			}
			break
		default:
			break
	}
}
function* loadUserFromServer() {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const token = yield select(tokenSelector)
	if (token) {
		config.headers['x-auth-token'] = token
	}
	yield axios.get('/api/user/auth', config)
}
async function registerUser(values) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const body = JSON.stringify(values)
	return await axios.post('/api/user/registration', body, config)
}
async function loginUser(values) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const body = JSON.stringify(values)
	return await axios.post('/api/user/login', body, config)
}

