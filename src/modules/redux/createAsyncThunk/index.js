import { store } from "@/redux/store.js"

/**
 * Упрощенная версия createAsyncThunk из Redux Toolkit
 *
 * @param {string} typePrefix - Префикс для типов экшенов
 * @param {Function} payloadCreator - Асинхронная функция
 * @returns {Function} Thunk-функция с свойствами pending, fulfilled, rejected
 */
export const createAsyncThunk = (typePrefix, payloadCreator) => {
	const pendingType = `${typePrefix}/pending`
	const fulfilledType = `${typePrefix}/fulfilled`
	const rejectedType = `${typePrefix}/rejected`

	const thunk = arg => async dispatch => {
		dispatch({ type: pendingType })

		try {
			const result = await payloadCreator(arg, {
				dispatch: store.dispatch,
				getState: () => store.getState(),
			})
			dispatch({
				type: fulfilledType,
				payload: result,
			})
			return result
		} catch (error) {
			const errorPayload =
				error instanceof Error ? error.message : "Unknown error"
			dispatch({
				type: rejectedType,
				payload: errorPayload,
				error: true,
			})
			throw error
		}
	}

	// Добавляем свойства для доступа к типам экшенов
	thunk.pending = pendingType
	thunk.fulfilled = fulfilledType
	thunk.rejected = rejectedType

	return thunk
}
