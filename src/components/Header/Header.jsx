import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { userLogout } from '../../store/user/thunk';
import {
	selectUserName,
	selectIsAuth,
	selectUserToken,
} from '../../store/selectors';
import './header.css';

function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const userName = useSelector(selectUserName);
	const isAuth = useSelector(selectIsAuth);
	const token = useSelector(selectUserToken);

	const logout = () => {
		dispatch(userLogout(token));
		navigate('/login');
	};

	useEffect(() => {
		if (isAuth) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
	}, [isAuth]);

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

export default Header;
