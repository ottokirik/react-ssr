import express from 'express';
import { renderReactApp } from './lib/renderer.js';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (_, res) => {
	res.status(200).send(renderReactApp());
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
