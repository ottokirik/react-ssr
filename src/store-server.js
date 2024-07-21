import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './client/slices.js';
import axios from 'axios';

export const createServerStore = (req) => {
	const axiosInstance = axios.create({
		baseURL: 'http://react-ssr-api.herokuapp.com',
		headers: { cookie: req.get('cookie') ?? '' },
	});

	const store = configureStore({
		reducer: reducers,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({ thunk: { extraArgument: axiosInstance } });
		},
	});

	return store;
};
