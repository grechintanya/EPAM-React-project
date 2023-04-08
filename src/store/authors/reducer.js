import { GET_AUTHORS, SAVE_AUTHOR } from './actionTypes';

const authorsInitialState = [];

const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case GET_AUTHORS:
			return [...action.payload];
		case SAVE_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
};

export default authorsReducer;
