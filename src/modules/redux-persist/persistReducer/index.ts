export const REHYDRATE = 'persist/REHYDRATE';

export const PURGE = 'persist/PURGE';

export const persistReducer = (persistConfig, rootReducer) => {
	const {
		key = 'root',
		whitelist = null,
		blacklist = null,
		version = -1,
	} = persistConfig;

	let hasHydrated = false;

	// Функция для слияния состояний
	const stateReconciler = (inboundState, originalState) => {
		return { ...originalState, ...inboundState };
	};

	// Получаем начальное состояние
	const getInitialState = () => {
		const initialState = rootReducer(undefined, { type: '__INIT__' });
		return {
			...initialState,
			_persist: { version, rehydrated: false },
		};
	};

	// Фильтруем состояние
	const filterState = (state, whitelist, blacklist) => {
		if (!state) return {};

		if (whitelist && Array.isArray(whitelist)) {
			const filtered = {};
			whitelist.forEach((key) => {
				if (state[key] !== undefined) {
					filtered[key] = state[key];
				}
			});
			return filtered;
		}

		if (blacklist && Array.isArray(blacklist)) {
			const filtered = { ...state };
			blacklist.forEach((key) => {
				delete filtered[key];
			});
			return filtered;
		}

		return state;
	};

	return (state = getInitialState(), action) => {
		let newState = state;

		// Обрабатываем REHYDRATE
		if (action.type === REHYDRATE && action.key === key) {
			// Фильтруем загруженное состояние
			const inboundState = filterState(action.payload, whitelist, blacklist);

			// Получаем текущее состояние без _persist
			const { _persist, ...currentState } = state;

			// Сливаем состояния
			const reconciledState = stateReconciler(inboundState, currentState);

			// Возвращаем с метаданными
			newState = {
				...reconciledState,
				_persist: {
					version: action.payload?._persist?.version || version,
					rehydrated: true,
				},
			};

			hasHydrated = true;
		}
		// Обрабатываем PURGE
		else if (action.type === PURGE && action.key === key) {
			return getInitialState();
		}

		// Пропускаем через оригинальный редьюсер
		const reducedState = rootReducer(newState, action);

		// Добавляем метаданные persist (кроме случаев, когда только что загрузили)
		if (action.type === REHYDRATE && action.key === key) {
			return reducedState;
		}

		return {
			...reducedState,
			_persist: newState._persist || { version, rehydrated: hasHydrated },
		};
	};
};
