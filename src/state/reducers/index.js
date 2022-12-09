import { combineReducers } from "redux";
import updateActiveObject from "./activeObjReducer";

// The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore
const reducers = combineReducers({
  activeObject : updateActiveObject 
});

export default reducers;
