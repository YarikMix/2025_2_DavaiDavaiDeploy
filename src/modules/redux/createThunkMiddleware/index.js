/**
 * Создаёт middleware для поддержки Redux-thunk с возможностью передачи дополнительного аргумента.
 *
 * Позволяет `action` быть функцией вместо объекта. Если `action` — функция, она будет вызвана с аргументами:
 * `dispatch`, `getState`.
 *
 * @returns {Function} Redux middleware.
 *
 * @example
 * const thunk = createThunkMiddleware({ api });
 * const store = createStore(reducer, applyMiddleware(thunk));
 *
 * // Пример использования:
 * const fetchData = () => (dispatch, getState, { api }) => {
 *   api.get('/data').then(response => {
 *     dispatch({ type: 'SET_DATA', payload: response });
 *   });
 * };
 */
export function createThunkMiddleware() {
	return ({ dispatch, getState }) =>
		next =>
		action => {
			if (typeof action === "function") {
				return action(dispatch, getState)
			}

			return next(action)
		}
}
