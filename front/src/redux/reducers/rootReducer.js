import { combineReducers } from "redux";
import pathReducer from "./pathReducer";
import notepadReducer from './notepadReducer'
import placemarkReducer from './placemarkReducer'
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";


const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  user: userReducer,
  test: userReducer,
  notepads: notepadReducer,
  placemarks: placemarkReducer,
  modals: modalReducer,
  path: pathReducer,
})
export default rootReducer
