import HTTPClient from '../../../modules/HTTPClient/index.js'
import { createAsyncThunk } from '@/modules/redux/createAsyncThunk/index.js'
import { createSlice } from '@/modules/redux/index.js'

/**
 * Начальное состояние среза фильмов.
 */
const initialState = {
	loading: false,
	films: [],
	error: null,
}

/**
 * Async Thunk: загрузка фильмов с сервера.
 */
export const fetchFilms = createAsyncThunk(
	'film/fetchFilms',
async () => {
		const response = await HTTPClient.get('/films/')
		return response.data
	}
)

/**
 * Срез фильмов
 */
const filmSlice = createSlice({
	name: 'film',
	initialState,
	reducers: {
		/**
		 * Очистка фильмов и ошибок
		 */
		clearFilms: (state) => {
			state.films = []
			state.error = null
			state.loading = false
		},

		/**
		 * Сброс ошибки
		 */
		resetError: (state) => {
			state.error = null
		},

		/**
		 * Ручная установка фильмов
		 */
		setFilms: (state, action) => {
			state.films = action.payload
		},

		/**
		 * Добавление фильмов к существующим (для пагинации)
		 */
		appendFilms: (state, action) => {
			state.films = [...state.films, ...action.payload]
		}
	},
	extraReducers: (builder) => {
		builder
			// Обработка fetchFilms (реальный API)
			.addCase(fetchFilms.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchFilms.fulfilled, (state, action) => {
				state.loading = false
				state.films = [...state.films, ...action.payload]
			})
			.addCase(fetchFilms.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

// Экспорт actions и reducer
export const { clearFilms, resetError, setFilms, appendFilms } = filmSlice.actions
export default filmSlice.reducer
