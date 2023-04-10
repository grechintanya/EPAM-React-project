import { LOGIN, LOGOUT } from './actionTypes';

export const userLogin = (user, token) => ({
	type: LOGIN,
	payload: {
		user: user,
		token: token,
	},
});

export const userLogout = () => ({
	type: LOGOUT,
});
