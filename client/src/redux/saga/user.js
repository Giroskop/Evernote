// import {put, takeEvery, call } from 'redux-saga'
import {put,call, takeEvery} from 'redux-saga/effects'

import { setUser } from '../actions/userAC'
import { USER_SET_SAGA } from '../types/user'
import axios from 'axios'

export const setUserSaga = (user) => {
  return {
    type: USER_SET_SAGA,
    payload: (user)
  }
}

export function* userWatcher() {
  yield takeEvery(USER_SET_SAGA, setUserWorker)
}
function* setUserWorker(action) {
  const user = yield call(getUserFromServer, action.payload)
  yield put(setUser(user))
}
function getUserFromServer(values) {
  return axios.get('/user')
}
