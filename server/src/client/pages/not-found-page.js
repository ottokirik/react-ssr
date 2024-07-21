import React from 'react';
import { useStaticContext } from '../static-context';

export const NotFoundPage = () => {
	const context = useStaticContext();

	if (context) {
		context.status = 404;
	}

	return <h3>Page not found</h3>;
};
