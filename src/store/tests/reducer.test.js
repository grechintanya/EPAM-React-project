import coursesReducer from '../courses/reducer';
import { mockedCoursesList } from '../../constants';
import { SAVE_NEW_COURSE, GET_COURSES } from '../courses/actionTypes';

const initialState = [];

test('reducer should return the initial state', () => {
	expect(coursesReducer(initialState, { type: undefined })).toEqual(
		initialState
	);
});

test('reducer should handle SAVE_COURSE and returns new state', () => {
	const newCourse = {
		title: 'Python',
		description: 'description',
		authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
		duration: 100,
		creationDate: '25/04/2022',
	};
	expect(
		coursesReducer(initialState, { type: SAVE_NEW_COURSE, payload: newCourse })
	).toEqual([newCourse]);
});

test('reducer should handle GET_COURSES and returns new state', () => {
	expect(
		coursesReducer(initialState, {
			type: GET_COURSES,
			payload: mockedCoursesList,
		})
	).toEqual(mockedCoursesList);
});
