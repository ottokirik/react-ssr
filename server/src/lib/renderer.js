import ReactDOM from 'react-dom/server';
import React from 'react';

import { Home } from '../client/components/home.js';

export const renderReactApp = () => {
	const content = ReactDOM.renderToString(<Home />);

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
