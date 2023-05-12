import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import CourseCard from '../CourseCard';
import { mockedAuthorsList, mockedCoursesList } from '../../../../../constants';

const mockedCourse = mockedCoursesList[0];

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [],
	authors: mockedAuthorsList,
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('CourseCard should display title', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard title={mockedCourse.title} />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.getByTestId('title').textContent).toBe(mockedCourse.title);
});

test('CourseCard should display description', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard description={mockedCourse.description} />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.getByTestId('description').textContent).toBe(
		mockedCourse.description
	);
});

test('CourseCard should display duration in the correct format', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard duration={mockedCourse.duration} />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.getByTestId('duration').textContent).toBe('Duration: 02:40');
});

test('CourseCard should display authors list', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard authors={mockedCourse.authors} />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.getByTestId('authors').textContent).toBe(
		'Authors: Vasiliy Dobkin'
	);
});

test('CourseCard should display created date in the correct format', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard creationDate={mockedCourse.creationDate} />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.getByTestId('creationDate').textContent).toBe(
		'Created: 08.03.2021'
	);
});
