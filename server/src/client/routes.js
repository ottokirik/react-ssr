import React from 'react';

import { Home } from './components/home';
import { Test } from './components/test';
import { UsersList } from './components/users-list';
import { store } from './store';
import { fetchUsers } from './slices';

const dispatch = store.dispatch;

const routes = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/test',
		element: <Test />,
	},
	{
		path: '/users',
		element: <UsersList />,
		fetchData: async () => {
			await dispatch(fetchUsers());
		},
	},
];

export { routes };
