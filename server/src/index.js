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
	const staticContext = { status: 200 };
	const content = await renderReactApp(req, res, store, staticContext);

	res.status(staticContext.status).send(content);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
