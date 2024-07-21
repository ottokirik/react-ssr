import express from 'express';
import { renderReactApp } from './lib/renderer.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { createServerStore } from './store-server.js';

const app = express();
const port = 3000;

app.use(
	'/api',
	createProxyMiddleware({
		target: 'http://react-ssr-api.herokuapp.com',
		changeOrigin: true,
		xfwd: true,
	}),
);

app.use(express.static('public'));

app.get('*', async (req, res) => {
	const store = createServerStore(req);

	res.status(200).send(await renderReactApp(req, res, store));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
