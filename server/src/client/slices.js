import { combineReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const { data } = await axios.get('https://react-ssr-api.herokuapp.com/users');

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

export const reducers = combineReducers({
	users: usersSlice.reducer,
});
