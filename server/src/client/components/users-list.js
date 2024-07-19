import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../slices';

export const UsersList = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.userList);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<>
			<h1>Users</h1>
			{users.map(({ name, id }) => (
				<div key={id}>{name}</div>
			))}
		</>
	);
};
