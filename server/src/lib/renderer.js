import ReactDOM from 'react-dom/server';
import React from 'react';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server.js';

import { routes } from '../client/routes.js';

const handler = createStaticHandler(routes);

export const renderReactApp = async (req, res) => {
	const fetchRequest = createFetchRequest(req, res);
	const context = await handler.query(fetchRequest);
	const router = createStaticRouter(handler.dataRoutes, context);

	const content = ReactDOM.renderToString(<StaticRouterProvider router={router} context={context} />);

	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script defer src="/bundle.js"></script>
				<title>Document</title>
			</head>
			<body>
				<div id="root">${content}</div>
			</body>
		</html>
	`;
};

function createFetchRequest(req, res) {
	const origin = `${req.protocol}://${req.get('host')}`;
	const url = new URL(req.originalUrl || req.url, origin);

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
