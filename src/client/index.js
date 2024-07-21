import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { routes } from './routes';
import { store } from './store';

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
	document.getElementById('root'),
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
