import { combineReducers } from 'redux';
import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import authReducer from './user/reducer';

const rootReducer = combineReducers({
	authors: authorsReducer,
	courses: coursesReducer,
	user: authReducer,
});

export default rootReducer;
