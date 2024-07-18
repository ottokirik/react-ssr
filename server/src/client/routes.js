import React from 'react';

import { Home } from './components/home';
import { Test } from './components/test';

const routes = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/test',
		element: <Test />,
	},
];

export { routes };
