import express from 'express';
import { renderReactApp } from './lib/renderer.js';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('*', async (req, res) => {
	res.status(200).send(await renderReactApp(req, res));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
