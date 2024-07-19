import { configureStore } from '@reduxjs/toolkit';
import { reducers } from '../client/slices';

export const createServerStore = () => {
	const store = configureStore({
		reducer: reducers,
	});

	return store;
};
