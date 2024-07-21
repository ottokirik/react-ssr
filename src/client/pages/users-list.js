import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../slices';

export const UsersPage = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.userList);

	useEffect(() => {
		if (users.length > 0) return;

		dispatch(fetchUsers());
	}, [dispatch, users.length]);

	return (
		<>
			<h3>Users</h3>
			<ul>
				{users.map(({ name, id }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</>
	);
};
