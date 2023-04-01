import {
	Route,
	Navigate,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import NotFound from './components/NotFound/NotFound';
import { mockedCoursesList, mockedAuthorsList } from './constants';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [userName, setUserName] = useState(localStorage.getItem('userName'));
	const [user, setUser] = useState({});

	const RequireAuth = ({ children }) => {
		const token = localStorage.getItem('token');
		if (!token) {
			return <Navigate to='/login' />;
		}
		return children;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path='/'
				element={<Header userName={userName} setUserName={setUserName} />}
			>
				<Route path='registration' element={<Registration />} />
				<Route path='login' element={<Login user={user} setUser={setUser} />} />
				<Route
					path='courses'
					element={
						<RequireAuth>
							<Courses courses={courses} authors={authors} />
						</RequireAuth>
					}
				/>
				<Route
					path='courses/:courseID'
					element={
						<RequireAuth>
							<CourseInfo courses={courses} />
						</RequireAuth>
					}
					errorElement={<NotFound />}
				/>
				<Route
					path='courses/add'
					element={
						<RequireAuth>
							<CreateCourse
								courses={courses}
								setCourses={setCourses}
								allAuthors={authors}
								setAllAuthors={setAuthors}
							/>
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
