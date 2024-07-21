import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAdmins } from '../slices';
import { requireAuth } from '../components';

const AdminsPageWithoutAuth = () => {
	const dispatch = useDispatch();
	const admins = useSelector((state) => state.admins.adminList);

	useEffect(() => {
		if (admins.length > 0) return;

		dispatch(fetchAdmins());
	}, [dispatch, admins.length]);

	return (
		<>
			<h3>Admins</h3>
			<ul>
				{admins.map(({ name, id }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</>
	);
};

export const AdminsPage = requireAuth(AdminsPageWithoutAuth);
