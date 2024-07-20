import React from 'react';

import { HomePage, UsersPage } from './pages';
import { store } from './store';
import { fetchUsers } from './slices';

const dispatch = store.dispatch;

const routes = [
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/users',
		element: <UsersPage />,
		fetchData: async () => {
			await dispatch(fetchUsers());
		},
	},
];

export { routes };
