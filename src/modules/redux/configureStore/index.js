import { applyMiddleware, createStore } from "../index.js"

export const configureStore = ({ reducer, middleware }) => {
	const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
	return createStoreWithMiddleware(reducer)
}
