import { createSlice } from '@/modules/redux/index.js'
import { createAsyncThunk } from '@/modules/redux/createAsyncThunk/index.js'
import HTTPClient from '@/modules/HTTPClient/index.js'

const initialState = {
	user: [],
	checkUserLoading: false,
	checkUserError: null,

	registerUserLoading: false,
	registerUserError: null,

	loginUserLoading: false,
	loginUserError: null,
}

export const checkUserAction = createAsyncThunk(
	"user/check",
	async () => {
		const response = await HTTPClient.get('/auth/check')
		return response.data
	}
)

export const registerUserAction = createAsyncThunk(
	"user/register",
	async ({login, password}) => {
		const response = await HTTPClient.post('/auth/signup', {
			data: {
				login: login,
				password: password,
			},
		})
		return response.data
	}
)

export const loginUserAction = createAsyncThunk(
	"user/login",
	async ({login, password}) => {
		const response = await HTTPClient.post('/auth/signin', {
			data: {
				login: login,
				password: password,
			},
		})
		return response.data
	}
)

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUserLoading: (state) => {
			state.loading = true
			state.error = null
		},
		returnUser: (state, action) => {
			state.loading = false
			state.user = action.payload.user
		},
		returnUserError: (state, action) => {
			state.loading = false
			state.error = action.payload.error
			state.user = []
		},
		createUser: (state, action) => {
			state.user.push(action.payload.user)
		},
		updateUser: (state, action) => {
			const index = state.users.findIndex(user => user.id === action.payload.user.id)
			if (index !== -1) {
				state.user[index] = action.payload.user
			}
		},
		deleteUser: (state, action) => {
			state.users = state.users.filter(user => user.id !== action.payload.userId)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(checkUserAction.pending, (state) => {
			state.checkUserLoading = true;
			state.checkUserError = null;
		});
		builder.addCase(checkUserAction.fulfilled, (state, action) => {
			state.checkUserLoading = false;
			state.checkUserError = null;

			state.user = action.payload;
		});
		builder.addCase(checkUserAction.rejected, (state, action) => {
			state.checkUserLoading = false;
			state.checkUserError = action.payload;
		});

		builder.addCase(registerUserAction.pending, (state) => {
			state.registerUserLoading = true;
			state.registerUserError = null;
		});
		builder.addCase(registerUserAction.fulfilled, (state, action) => {
			state.registerUserLoading = false;
			state.registerUserError = null;

			state.user = action.payload;
		});
		builder.addCase(registerUserAction.rejected, (state, action) => {
			state.registerUserLoading = false;
			state.registerUserError = action.payload;
		});

		builder.addCase(loginUserAction.pending, (state) => {
			state.loginUserLoading = true;
			state.loginUserError = null;
		});
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.loginUserLoading = false;
			state.loginUserError = null;

			state.user = action.payload;
		});
		builder.addCase(loginUserAction.rejected, (state, action) => {
			state.loginUserLoading = false;
			state.loginUserError = action.payload;
		});
	}
})

export const {
	setUserLoading,
	returnUser,
	returnUserError,
	createUser,
	updateUser,
	deleteUser,
} = userSlice.actions

export default userSlice.reducer
