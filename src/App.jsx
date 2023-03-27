import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import NotFound from './components/NotFound/NotFound';
import { mockedCoursesList } from './constants';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [userName, setUserName] = useState(localStorage.getItem('userName'));
	const [user, setUser] = useState({});
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		setUserName(localStorage.getItem('userName'));
	}, [navigate, userName]);

	return (
		<div className='container'>
			<Header userName={userName} setUserName={setUserName} />
			<Routes>
				<Route
					path='/'
					element={
						token ? <Navigate to='/courses' /> : <Navigate to='/login' />
					}
				/>
				<Route path='registration' element={<Registration />} />
				<Route path='login' element={<Login user={user} setUser={setUser} />} />
				<Route
					path='courses'
					element={<Courses courses={courses} setCourses={setCourses} />}
				/>
				<Route path='courses/:courseID' element={<CourseInfo />} />
				<Route
					path='courses/add'
					element={<CreateCourse courses={courses} setCourses={setCourses} />}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}
export default App;
