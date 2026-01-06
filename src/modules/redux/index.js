import { applyMiddleware } from "./applyMiddleware/index.js"
import { combineReducers } from "./combineReducers/index.js"
import { configureStore } from "./configureStore/index.js"
import { createSlice } from "./createSlice/index.js"
import { createStore } from "./createStore/index.js"
import { createThunkMiddleware } from "./createThunkMiddleware/index.js"
import thunk from "./thunk/index.js"

export {
	applyMiddleware,
	combineReducers,
	configureStore,
	createSlice,
	createStore,
	createThunkMiddleware,
	thunk,
}
