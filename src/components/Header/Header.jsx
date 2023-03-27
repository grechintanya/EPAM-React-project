import { useNavigate, useLocation } from 'react-router-dom';

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

	return (
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
	);
}

export default Header;
