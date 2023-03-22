import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './header.css';

function Header() {
	return (
		<header className='header'>
			<Logo />
			<div className='auth'>
				<div className='user'>Tanya</div>
				<Button buttonText='Logout' className='btn_header' />
			</div>
		</header>
	);
}

export default Header;
