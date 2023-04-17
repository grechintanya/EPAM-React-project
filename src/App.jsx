import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/courseForm';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import { getUserData } from './store/user/thunk';
import { fetchAllCourses } from './store/courses/thunk';
import { fetchAllAuthors } from './store/authors/thunk';
import { selectUserToken } from './store/selectors';

function App() {
	const dispatch = useDispatch();
	const token = useSelector(selectUserToken);

	useEffect(() => {
		dispatch(fetchAllAuthors());
	}, []);

	useEffect(() => {
		dispatch(fetchAllCourses());
	}, []);

	useEffect(() => {
		if (token) {
			dispatch(getUserData(token));
		}
	}, [token]);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Header />}>
				<Route path='registration' element={<Registration />} />
				<Route path='login' element={<Login />} />
				<Route path='courses' element={<Courses />} />
				<Route
					path='courses/:courseID'
					element={<CourseInfo />}
					errorElement={<NotFound />}
				/>
				<Route
					path='courses/add'
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
				/>
				<Route
					path='courses/update/:courseID'
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
					errorElement={<NotFound />}
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
