import { LOGIN, LOGOUT, GET_USER_DATA } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('token') || '',
	role: '',
};

const authReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				isAuth: true,
				token: action.payload,
			};
		case GET_USER_DATA:
			return {
				...state,
				isAuth: true,
				...action.payload,
			};
		case LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
			};
		default:
			return state;
	}
};

export default authReducer;
