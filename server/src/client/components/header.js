import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = () => {
	const isAuth = useSelector((state) => state.auth.currentUser);

	return (
		<header>
			<nav style={{ display: 'flex', gap: '1rem' }}>
				<Link to="/">Home</Link>
				<Link to="/users">Users</Link>
				<Link to="/admins">Admins</Link>
				{isAuth ? <a href="/api/logout">Logout</a> : <a href="/api/auth/google">Login</a>}
			</nav>
		</header>
	);
};
