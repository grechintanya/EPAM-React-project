import { BASIC_URL } from './constants';

export const handleRequest = async (url, options = null) => {
	try {
		const response = await fetch(`${BASIC_URL}/${url}`, options);
		const result = await response.json();
		if (!response.ok) {
			if (result && result.errors) {
				alert(result.errors);
			} else {
				alert('Invalid data');
			}
		} else {
			return result;
		}
	} catch (error) {
		alert(error.message);
	}
};

export const fetchCourses = async () => {
	const courses = await handleRequest('courses/all');
	return courses;
};

export const fetchAuthors = async () => {
	const authors = await handleRequest('authors/all');
	return authors;
};

export const handlePostRequest = async (url, data) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const result = await handleRequest(url, options);
	return result;
};

export const handleUserLogin = async (user) => {
	const result = await handlePostRequest('login', user);
	return result;
};

export const handleUserRegistration = async (user) => {
	const result = await handlePostRequest('register', user);
	return result;
};
