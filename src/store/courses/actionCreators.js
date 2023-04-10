import * as actions from './actionTypes';

export const getAllCourses = (courses) => ({
	type: actions.GET_COURSES,
	payload: courses,
});

export const newCourseSaved = (newCourse) => ({
	type: actions.SAVE_NEW_COURSE,
	payload: newCourse,
});

export const courseUpdated = (id, updatedFields) => ({
	type: actions.UPDATE_COURSE,
	payload: {
		id: id,
		fields: updatedFields,
	},
});

export const courseDeleted = (id) => ({
	type: actions.DELETE_COURSE,
	payload: id,
});
