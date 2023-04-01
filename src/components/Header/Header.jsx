import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './header.css';

function Header({ userName, setUserName }) {
	const navigate = useNavigate();
	const location = useLocation();
	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		setUserName('');
		navigate('/login');
	};

	useEffect(() => {
		setUserName(localStorage.getItem('userName'));
	}, [userName, navigate]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
	}, []);

	return (
		<>
			<header className='header'>
				<Logo />
				{location.pathname !== '/login' &&
				location.pathname !== '/registration' ? (
					<div className='auth'>
						<div className='user'>{userName}</div>
						<Button
							buttonText='Logout'
							className='btn_header'
							handleClick={() => logout()}
						/>
					</div>
				) : (
					''
				)}
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
}

Header.propTypes = {
	userName: PropTypes.string,
	setUserName: PropTypes.func,
};

export default Header;
