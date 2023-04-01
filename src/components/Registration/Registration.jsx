import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import handleRequest from '../../helpers/handleRequest';
import './registration.css';

function Registration() {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [pswd, setPswd] = useState('');

	const navigate = useNavigate();

	const handleRegistration = async (e) => {
		e.preventDefault();
		const user = {
			name: userName,
			email: email,
			password: pswd,
		};

		const result = await handleRequest(user, 'register');
		if (result.successful) {
			navigate('/login');
		}
	};

	return (
		<>
			<h2 className='heading'>Registration</h2>
			<form
				className='registration_form'
				onSubmit={(e) => handleRegistration(e)}
			>
				<Input
					labelText='Name'
					placeholderText='Enter name'
					value={userName}
					handleChange={(e) => setUserName(e.target.value)}
					required
				/>
				<Input
					labelText='Email'
					placeholderText='Enter email'
					value={email}
					handleChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Input
					labelText='Password'
					placeholderText='Enter password'
					type='password'
					value={pswd}
					handleChange={(e) => setPswd(e.target.value)}
					required
				/>
				<Button buttonText='Registration' className='btn_center' />
			</form>
			<p className='link_message'>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</>
	);
}

export default Registration;
