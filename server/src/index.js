import express from 'express';
import { renderReactApp } from './lib/renderer.js';
import { createServerStore } from './lib/store.js';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('*', async (req, res) => {
	const store = createServerStore();

	res.status(200).send(await renderReactApp(req, res, store));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
