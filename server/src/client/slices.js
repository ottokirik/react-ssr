import { combineReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* ---------------------------------- Users --------------------------------- */

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { extra: api }) => {
	const { data } = await api.get('/users');

	return data;
});

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		userList: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.userList = action.payload;
		});
	},
});

/* ------------------------------ Current user ------------------------------ */

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { extra: api }) => {
	const { data } = await api.get('/current_user');

	return data;
});

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		currentUser: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
			state.currentUser = action.payload || false;
		});
	},
});

export const reducers = combineReducers({
	users: usersSlice.reducer,
	auth: authSlice.reducer,
});
