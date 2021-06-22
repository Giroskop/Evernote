import { combineReducers } from "redux";
import pathReducer from "./pathReducer";
import notepadReducer from './notepadReducer'
import placemarkReducer from './placemarkReducer'
import tagReducer from './tagReducer'
import userReducer from "./userReducer";
import placemarksReducer from "./placemarkReducer";


const rootReducer = combineReducers({
  user: userReducer,
  notepads: notepadReducer,
  placemarks: placemarksReducer,
  tags: tagReducer,
  path: pathReducer,
})
export default rootReducer
