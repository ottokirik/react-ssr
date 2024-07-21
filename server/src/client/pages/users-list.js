import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../slices';

export const UsersPage = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.userList);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

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
