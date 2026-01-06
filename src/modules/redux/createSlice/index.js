/**
 * Создает slice с поддержкой асинхронных thunk'ов
 */
export const createSlice = ({
	name,
	initialState,
	reducers = {},
	extraReducers,
}) => {
	const actions = {}
	const reducerMap = {}

	// Создаем экшены и редьюсеры для синхронных reducers
	Object.entries(reducers).forEach(([key, reducerFn]) => {
		const actionType = `${name}/${key}`
		actions[key] = payload => ({
			type: actionType,
			payload,
		})
		reducerMap[actionType] = (state, action) => {
			// Явно возвращаем новое состояние
			return reducerFn(state, action) || state
		}
	})

	// Если есть extraReducers
	if (extraReducers) {
		// Создаем простой builder
		const builder = {
			addCase: (actionType, reducer) => {
				reducerMap[actionType] = (state, action) => {
					// Явно возвращаем новое состояние
					const newState = reducer(state, action)
					return newState !== undefined ? newState : state
				}
				return builder
			},
		}

		// Вызываем extraReducers с builder
		extraReducers(builder)
	}

	const reducer = (state = initialState, action) => {
		const handler = reducerMap[action.type]
		if (handler) {
			return handler(state, action)
		}
		return state
	}

	return { actions, reducer }
}
