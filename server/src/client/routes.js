import React from 'react';

import { Home } from './components/home';
import { Test } from './components/test';
import { UsersList } from './components/users-list';

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
	},
];

export { routes };
