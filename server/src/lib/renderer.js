import ReactDOM from 'react-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server.js';
import serialize from 'serialize-javascript';

import { routes } from '../client/routes.js';
import { store } from '../client/store.js';

const handler = createStaticHandler(routes);

export const renderReactApp = async (req, res) => {
	const fetchRequest = createFetchRequest(req, res);
	const context = await handler.query(fetchRequest);
	const router = createStaticRouter(handler.dataRoutes, context);

	const url = createURL(req);
	const foundRoutes = matchRoutes(routes, url);

	if (!foundRoutes) {
		return null;
	}

	const promises = foundRoutes.filter(({ route }) => route.fetchData).map(({ route }) => route.fetchData());
	await Promise.all(promises);

	const content = ReactDOM.renderToString(
		<Provider store={store}>
			<StaticRouterProvider router={router} context={context} />
		</Provider>,
	);

	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script defer src="/bundle.js"></script>
				<script>window.__INITIAL_STATE__ = ${serialize(store.getState())}</script>
				<title>Document</title>
			</head>
			<body>
				<div id="root">${content}</div>
			</body>
		</html>
	`;
};

const createURL = (req) => {
	const origin = `${req.protocol}://${req.get('host')}`;
	const url = new URL(req.originalUrl || req.url, origin);

	return url;
};

function createFetchRequest(req, res) {
	const url = createURL(req);

	const controller = new AbortController();
	res.on('close', () => controller.abort());

	const headers = new Headers();

	for (const [key, values] of Object.entries(req.headers)) {
		if (values) {
			if (Array.isArray(values)) {
				for (const value of values) {
					headers.append(key, value);
				}
			} else {
				headers.set(key, values);
			}
		}
	}

	const init = {
		method: req.method,
		headers,
		signal: controller.signal,
	};

	if (req.method !== 'GET' && req.method !== 'HEAD') {
		init.body = req.body;
	}

	return new Request(url.href, init);
}
