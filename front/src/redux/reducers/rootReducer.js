import { combineReducers } from "redux";
import pathReducer from "./pathReducer";
import notepadReducer from './notepadReducer'
import placemarkReducer from './placemarkReducer'
import tagReducer from './tagReducer'
import userReducer from "./userReducer";


const rootReducer = combineReducers({
  user: userReducer,
  path: pathReducer,
  notepads: notepadReducer,
})
export default rootReducer
