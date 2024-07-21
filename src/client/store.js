import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './slices';
import axios from 'axios';

const axiosInstance = axios.create({ baseURL: '/api' });

export const store = configureStore({
	reducer: reducers,
	preloadedState: typeof window === 'undefined' ? undefined : window.__INITIAL_STATE__,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({ thunk: { extraArgument: axiosInstance } });
	},
});
