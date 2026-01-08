import { combineReducers } from '@/modules/redux';
import { persistReducer, persistStore, storage } from '@/modules/redux-persist';
import { applyMiddleware } from '@/modules/redux/applyMiddleware';
import { createStore } from '@/modules/redux/createStore';
import actorReducer from '@/redux/features/actor/reducers.ts';
import calendarReducer from '@/redux/features/calendar/reducers.ts';
import compilationReducer from '@/redux/features/compilations/reducers.ts';
import counterReducer from '@/redux/features/counter/reducers.ts';
import favoritesReducer from '@/redux/features/favorites/reducers.ts';
import filmReducer from '@/redux/features/film/reducers.ts';
import filmsReducer from '@/redux/features/films/reducers.ts';
import genreReducer from '@/redux/features/genre/reducers.ts';
import promoFilmReducer from '@/redux/features/promoFilm/reducers.ts';
import searchReducer from '@/redux/features/search/reducers.ts';
import userReducer from '@/redux/features/user/reducers.ts';
import { middlewares } from './middlewares';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};

/**
 * Начальное состояние приложения.
 */
const initialState = {};

/**
 * Создаёт store с применёнными middleware.
 */
const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore);

const rootReducer = combineReducers({
	counter: counterReducer,
	films: filmsReducer,
	film: filmReducer,
	user: userReducer,
	genre: genreReducer,
	promoFilm: promoFilmReducer,
	actor: actorReducer,
	favorites: favoritesReducer,
	calendar: calendarReducer,
	search: searchReducer,
	compilation: compilationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Главный Redux store приложения.
 */
export const store = createStoreWithMiddleware(persistedReducer, initialState);

export const persistor = persistStore(store, persistConfig);
