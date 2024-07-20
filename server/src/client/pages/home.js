import React from 'react';

export const HomePage = () => {
	const handleClick = () => {
		console.log('clicked');
	};

	return (
		<>
			<div>I'm the BEST home page</div>
			<button type="button" onClick={handleClick}>
				Click me
			</button>
		</>
	);
};
