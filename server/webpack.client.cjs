const path = require('node:path');

module.exports = {
	entry: './src/client/index.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [['@babel/preset-env', { targets: 'defaults' }], '@babel/preset-react'],
				},
			},
		],
	},
};
