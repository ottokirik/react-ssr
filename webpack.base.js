module.exports = {
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
