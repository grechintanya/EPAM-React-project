import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import handleRequest from '../../helpers/handleRequest';
import './login.css';

function Login() {
	const [email, setEmail] = useState('');
	const [pswd, setPswd] = useState('');

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		const user = {
			email: email,
			password: pswd,
		};
		const result = await handleRequest(user, 'login');
		if (result?.successful) {
			const token = result.result;
			localStorage.setItem('token', token);
			localStorage.setItem('userName', result.user.name);
			navigate('/courses');
		}
	};

	return (
		<>
			<h2 className='heading'>Login</h2>
			<form className='login_form' onSubmit={(e) => handleLogin(e)}>
				<Input
					labelText='Email'
					placeholderText='Enter email'
					value={email}
					handleChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					labelText='Password'
					placeholderText='Enter password'
					type='password'
					value={pswd}
					handleChange={(e) => setPswd(e.target.value)}
				/>
				<Button buttonText='Login' className='btn_center' />
			</form>
			<p className='link_message'>
				If you not have an account you can{' '}
				<Link to='/registration'>Registration</Link>
			</p>
		</>
	);
}

export default Login;
