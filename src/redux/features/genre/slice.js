import HTTPClient from '../../../modules/HTTPClient/index.js'
import { createAsyncThunk } from '@/modules/redux/createAsyncThunk/index.js'
import { createSlice } from '@/modules/redux/index.js'


/**
 * Async Thunk: получает данные жанра по ID
 */
export const fetchGenre = createAsyncThunk(
	'genre/fetchGenre',
	async (id, { rejectWithValue }) => {
		try {
			const response = await HTTPClient.get(`/genres/${id}`)
			return response.data
		} catch (error) {
			return rejectWithValue(error.message || 'Ошибка загрузки жанра')
		}
	}
)

/**
 * Async Thunk: получает список всех жанров
 */
export const fetchGenres = createAsyncThunk(
	'genre/fetchGenres',
	async (_, { rejectWithValue }) => {
		try {
			const response = await HTTPClient.get('/genres')
			return response.data
		} catch (error) {
			return rejectWithValue(error.message || 'Ошибка загрузки списка жанров')
		}
	}
)

/**
 * Async Thunk: получает фильмы по жанру
 */
export const fetchGenreFilms = createAsyncThunk(
	'genre/fetchGenreFilms',
	async ({ id, limit, offset }, { rejectWithValue }) => {
		try {
			const response = await HTTPClient.get(`/films/genre/${id}`, {
				params: { count: limit, offset },
			})
			return response.data
		} catch (error) {
			return rejectWithValue(error.message || 'Ошибка загрузки фильмов жанра')
		}
	}
)


/**
 * Начальное состояние среза жанров.
 */
const initialState = {
	// Состояние для одного жанра
	curGenre: null,
	genreLoading: false,
	genreError: null,

	// Состояние для списка жанров
	genres: [],
	genresLoading: false,
	genresError: null,

	// Состояние для фильмов жанра
	genreFilms: [],
	genreFilmsLoading: false,
	genreFilmsError: null,
}

/**
 * Срез жанров
 */
const genreSlice = createSlice({
	name: 'genre',
	initialState,
	reducers: {
		/**
		 * Сброс состояния одного жанра
		 */
		resetGenre: (state) => {
			state.curGenre = null
			state.genreLoading = false
			state.genreError = null
		},

		/**
		 * Сброс состояния фильмов жанра
		 */
		resetGenreFilms: (state) => {
			state.genreFilms = []
			state.genreFilmsLoading = false
			state.genreFilmsError = null
		},

		/**
		 * Сброс состояния списка жанров
		 */
		resetGenres: (state) => {
			state.genres = []
			state.genresLoading = false
			state.genresError = null
		},

		/**
		 * Сброс всех состояний
		 */
		resetAll: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Обработка fetchGenre
			.addCase(fetchGenre.pending, (state) => {
				state.genreLoading = true
				state.genreError = null
			})
			.addCase(fetchGenre.fulfilled, (state, action) => {
				state.genreLoading = false
				state.genreError = null
				state.curGenre = action.payload
			})
			.addCase(fetchGenre.rejected, (state, action) => {
				state.genreLoading = false
				state.genreError = action.payload
				state.curGenre = null
			})

			// Обработка fetchGenres
			.addCase(fetchGenres.pending, (state) => {
				state.genresLoading = true
				state.genresError = null
			})
			.addCase(fetchGenres.fulfilled, (state, action) => {
				state.genresLoading = false
				state.genresError = null
				state.genres = action.payload
			})
			.addCase(fetchGenres.rejected, (state, action) => {
				state.genresLoading = false
				state.genresError = action.payload
				state.genres = []
			})

			// Обработка fetchGenreFilms
			.addCase(fetchGenreFilms.pending, (state) => {
				state.genreFilmsLoading = true
				state.genreFilmsError = null
			})
			.addCase(fetchGenreFilms.fulfilled, (state, action) => {
				state.genreFilmsLoading = false
				state.genreFilmsError = null
				state.genreFilms = action.payload
			})
			.addCase(fetchGenreFilms.rejected, (state, action) => {
				state.genreFilmsLoading = false
				state.genreFilmsError = action.payload
				state.genreFilms = []
			})
	},
})

// Экспорт actions и reducer
export const { resetGenre, resetGenreFilms, resetGenres, resetAll } = genreSlice.actions

export default genreSlice.reducer
