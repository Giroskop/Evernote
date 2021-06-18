import { combineReducers } from "redux";
import pathReducer from "./pathReducer";
import notepadReducer from './notepadReducer'
import placemarkReducer from './placemarkReducer'
import tagReducer from './tagReducer'


const rootReducer = combineReducers({
  notepads: notepadReducer,
  placemarks: placemarkReducer,
  tags: tagReducer,
  path: pathReducer,
})
export default rootReducer
