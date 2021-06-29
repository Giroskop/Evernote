import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'
import initState from './initState'
import createSagaMiddleware from '@redux-saga/core'
import { all } from '@redux-saga/core/effects'
import { userWatcher } from './saga/authSaga'

const sagaMiddleware = createSagaMiddleware()
function* rootSaga() {
  yield all([
    userWatcher()
  ])
}

const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

export default store
