import { handleRequest, fetchCourses } from '../../services';

import {
	getAllCourses,
	courseDeleted,
	courseUpdated,
	newCourseSaved,
} from './actionCreators';

export const fetchAllCourses = () => async (dispatch) => {
	const result = await fetchCourses();
	if (result?.successful) {
		dispatch(getAllCourses(result.result));
	}
};

export const fetchCourseDelete = (courseID, token) => async (dispatch) => {
	const options = {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	};
	await handleRequest(`courses/${courseID}`, options);
	dispatch(courseDeleted(courseID));
};

export const fetchCourseUpdate =
	(courseID, course, token) => async (dispatch) => {
		const options = {
			method: 'PUT',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(course),
		};
		const response = await handleRequest(`courses/${courseID}`, options);
		dispatch(courseUpdated(courseID, response.result));
	};

export const fetchCourseCreate = (course, token) => async (dispatch) => {
	const options = {
		method: 'POST',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(course),
	};
	const response = await handleRequest('courses/add', options);
	dispatch(newCourseSaved(response.result));
};
