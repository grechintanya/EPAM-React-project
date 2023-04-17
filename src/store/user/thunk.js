import { handleRequest, handleUserLogin } from '../../services';
import { BASIC_URL } from '../../constants';
import { LOGOUT, LOGIN, GET_USER_DATA } from '../user/actionTypes';

export const getUserData = (token) => async (dispatch) => {
	const result = await handleRequest('users/me', {
		headers: {
			Authorization: token,
		},
	});
	if (result) {
		const data = await result.result;
		dispatch({ type: GET_USER_DATA, payload: data });
	}
};

export const userLogin = (user) => async (dispatch) => {
	const result = await handleUserLogin(user);
	if (result?.successful) {
		const token = await result.result;
		localStorage.setItem('token', token);
		dispatch({ type: LOGIN, payload: token });
	}
};

export const userLogout = (token) => async (dispatch) => {
	await fetch(`${BASIC_URL}/logout`, {
		method: 'DELETE',
		headers: { Authorization: token },
	});
	localStorage.removeItem('token');
	dispatch({ type: LOGOUT });
};
