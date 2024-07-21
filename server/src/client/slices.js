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

/* --------------------------------- Admins --------------------------------- */

export const fetchAdmins = createAsyncThunk('admins/fetchAdmins', async (_, { extra: api, rejectWithValue }) => {
	try {
		const { data } = await api.get('/admins');

		return data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

const adminsSlice = createSlice({
	name: 'admins',
	initialState: {
		adminList: [],
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAdmins.fulfilled, (state, action) => {
				state.adminList = action.payload;
			})
			.addCase(fetchAdmins.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

/* -------------------------------- Reducers -------------------------------- */

export const reducers = combineReducers({
	users: usersSlice.reducer,
	admins: adminsSlice.reducer,
	auth: authSlice.reducer,
});
