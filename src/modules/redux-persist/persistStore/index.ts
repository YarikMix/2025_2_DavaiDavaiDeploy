export const REHYDRATE = 'persist/REHYDRATE';

export const PURGE = 'persist/PURGE';

export const persistStore = (store, config = {}) => {
	const {
		storage,
		key = 'root',
		version = -1,
		throttle = 0,
		whitelist = null,
		blacklist = null,
	} = config;

	let isPaused = false;
	const listeners = [];

	// Уведомляем всех слушателей
	const notifyListeners = () => {
		listeners.forEach((listener) => listener());
	};

	// Метод подписки для PersistGate
	const subscribe = (callback) => {
		listeners.push(callback);

		// Возвращаем функцию отписки
		return () => {
			const index = listeners.indexOf(callback);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		};
	};

	// Загрузка из storage
	const loadState = async () => {
		try {
			const serialized = await storage.getItem(key);
			if (!serialized) {
				return null;
			}

			const parsed = JSON.parse(serialized);

			// Проверяем версию
			if (parsed._persist && parsed._persist.version !== version) {
				console.warn(
					`Version mismatch. Storage: ${parsed._persist.version}, Config: ${version}`,
				);
				return null;
			}

			return parsed;
		} catch (error) {
			console.warn('Failed to load state:', error);
			return null;
		}
	};

	// Сохранение в storage
	const saveState = async (state) => {
		if (isPaused) {
			return;
		}

		try {
			// Фильтруем состояние перед сохранением
			let stateToSave = { ...state };

			// Удаляем метаданные persist из сохраняемого состояния
			delete stateToSave._persist;

			// Применяем фильтры
			if (whitelist && Array.isArray(whitelist)) {
				const filtered = {};
				whitelist.forEach((key) => {
					if (stateToSave[key] !== undefined) {
						filtered[key] = stateToSave[key];
					}
				});
				stateToSave = filtered;
			} else if (blacklist && Array.isArray(blacklist)) {
				blacklist.forEach((key) => {
					delete stateToSave[key];
				});
			}

			// Добавляем метаданные версии
			const stateWithMetadata = {
				...stateToSave,
				_persist: { version },
			};

			await storage.setItem(key, JSON.stringify(stateWithMetadata));
		} catch (error) {
			console.warn('Failed to save state:', error);
		}
	};

	// Инициализация
	const init = async () => {
		const savedState = await loadState();

		// Диспатчим REHYDRATE
		store.dispatch({
			type: REHYDRATE,
			key,
			payload: savedState,
			err: savedState ? null : new Error('No saved state found'),
		});

		// Уведомляем всех слушателей
		notifyListeners();
	};

	// Подписка на изменения store с троттлингом
	let lastSaveTime = 0;
	let saveTimer = null;

	const handleStoreChange = () => {
		const state = store.getState();

		// Троттлинг
		if (throttle > 0) {
			const now = Date.now();
			if (now - lastSaveTime < throttle) {
				if (saveTimer) {
					clearTimeout(saveTimer);
				}
				saveTimer = setTimeout(() => {
					void saveState(state);
					lastSaveTime = Date.now();
				}, throttle);
				return;
			}
		}

		void saveState(state);
		lastSaveTime = Date.now();
	};

	// Начинаем отслеживать изменения
	store.subscribe(handleStoreChange);

	// Запускаем инициализацию
	void init();

	// Возвращаем объект persistor
	return {
		purge: async () => {
			await storage.removeItem(key);
			store.dispatch({ type: PURGE, key });
		},

		flush: async () => {
			const state = store.getState();
			await saveState(state);
		},

		pause: () => {
			isPaused = true;
		},

		persist: () => {
			isPaused = false;
			// Сохраняем текущее состояние
			const state = store.getState();
			void saveState(state);
		},

		getState: async () => {
			return await loadState();
		},

		// Метод для PersistGate
		subscribe,
	};
};
