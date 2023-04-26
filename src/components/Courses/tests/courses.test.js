import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Courses from '../Courses';
import { mockedAuthorsList, mockedCoursesList } from '../../../constants';

let mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('Courses should display amount of CourseCard equal length of courses array', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryAllByTestId('course-card').length).toEqual(
		mockedCoursesList.length
	);
});

test('Courses should display Empty container if courses array length is 0', () => {
	mockedState = {
		user: {
			isAuth: true,
			name: 'Test Name',
			role: 'admin',
		},
		courses: [],
		authors: [],
	};
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.getByTestId('courses')).toBeInTheDocument();
});

test('CourseForm should be showed after a click on a button "Add new course"', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);
	fireEvent.click(screen.getByText('Add new course'));
	expect(window.location.pathname).toEqual('/courses/add');
});
