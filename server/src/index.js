import express from 'express';
import ReactDOM from 'react-dom/server';
import React from 'react';
import { Home } from './client/components/home.js';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (_, res) => {
	const content = ReactDOM.renderToString(<Home />);

	const html = `
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

	res.send(html);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
