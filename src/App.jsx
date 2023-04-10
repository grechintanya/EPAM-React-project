import {
	Route,
	Navigate,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import NotFound from './components/NotFound/NotFound';
import { mockedCoursesList, mockedAuthorsList } from './constants';
import { fetchCourses, fetchAuthors } from './services';
import { getAllCourses } from './store/courses/actionCreators';
import { getAllAuthors } from './store/authors/actionCreators';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [userName, setUserName] = useState(localStorage.getItem('userName'));
	const [user, setUser] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		const addAuthors = async () => {
			const result = await fetchAuthors();
			if (result?.successful) {
				dispatch(getAllAuthors(result.result));
			}
		};
		addAuthors();
	}, []);

	useEffect(() => {
		const addCourses = async () => {
			const result = await fetchCourses();
			if (result?.successful) {
				dispatch(getAllCourses(result.result));
			}
		};
		addCourses();
	}, []);

	const RequireAuth = ({ children }) => {
		const token = localStorage.getItem('token');
		if (!token) {
			return <Navigate to='/login' />;
		}
		return children;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Header />}>
				<Route path='registration' element={<Registration />} />
				<Route path='login' element={<Login user={user} setUser={setUser} />} />
				<Route
					path='courses'
					element={
						<RequireAuth>
							<Courses />
						</RequireAuth>
					}
				/>
				<Route
					path='courses/:courseID'
					element={
						<RequireAuth>
							<CourseInfo />
						</RequireAuth>
					}
					errorElement={<NotFound />}
				/>
				<Route
					path='courses/add'
					element={
						<RequireAuth>
							<CreateCourse />
						</RequireAuth>
					}
				/>
				<Route path='*' element={<NotFound />} />
			</Route>
		)
	);

	return (
		<div className='container'>
			<RouterProvider router={router} />
		</div>
	);
}
export default App;
