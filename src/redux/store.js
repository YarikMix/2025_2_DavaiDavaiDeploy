import { combineReducers, configureStore } from '../modules/redux/index.js'
import thunk from "../modules/redux/thunk/index.js"
import filmsReducer from "./features/film/slice.js"
import genresReducer from "./features/genre/slice.js"
import userReducer from "./features/user/slice.js"

export const reducer = combineReducers({
	films: filmsReducer,
	genres: genresReducer,
	user: userReducer
})

export const store = configureStore({ reducer, middleware: [thunk] })
