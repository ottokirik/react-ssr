import express from 'express';
import ReactDOM from 'react-dom/server';
import React from 'react';
import { Home } from './client/components/home.js';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
	const content = ReactDOM.renderToString(<Home />);
	res.send(content);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
