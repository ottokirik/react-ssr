import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './slices';

export const store = configureStore({
	reducer: reducers,
	preloadedState: typeof window === 'undefined' ? undefined : window.__INITIAL_STATE__,
});
