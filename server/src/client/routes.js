import React from 'react';

import { HomePage, UsersPage } from './pages';
import { fetchUsers, fetchCurrentUser } from './slices';
import { App } from './app';

const routes = [
	{
		path: '/',
		element: <App />,
		fetchData: async (dispatch) => {
			await dispatch(fetchCurrentUser());
		},
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'users',
				element: <UsersPage />,
				fetchData: async (dispatch) => {
					await dispatch(fetchUsers());
				},
			},
		],
	},
];

export { routes };
