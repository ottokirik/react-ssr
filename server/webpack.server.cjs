const path = require('node:path');

module.exports = {
	target: 'node',

	entry: './src/index.js',

	output: {
		filename: 'bundle.cjs',
		path: path.resolve(__dirname, 'build'),
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
