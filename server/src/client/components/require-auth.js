import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStaticContext } from '../static-context';

export const requireAuth = (Wrapped) => (props) => {
	const currentUser = useSelector((state) => state.auth.currentUser);
	const context = useStaticContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser === false && !context) {
			navigate('/');
		}
	}, [currentUser, context, navigate]);

	if (currentUser === null) {
		return <div>Loading...</div>;
	}

	if (currentUser === false && context) {
		context.url = '/';
		context.status = 301;
		return null;
	}

	return <Wrapped {...props} />;
};
