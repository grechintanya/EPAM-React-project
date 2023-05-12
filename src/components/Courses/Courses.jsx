import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { selectAllCourses, selectUserRole } from '../../store/selectors';
import './courses.css';

function Courses() {
	const courses = useSelector(selectAllCourses);
	const userRole = useSelector(selectUserRole);
	const [query, setQuery] = useState('');
	const [filteredCourses, setFilteredCourses] = useState(courses);

	useEffect(() => {
		setFilteredCourses(courses);
	}, [courses]);

	const courseList = filteredCourses.map((item, i) => (
		<CourseCard
			key={i}
			title={item.title}
			courseID={item.id}
			description={item.description}
			authors={item.authors}
			duration={item.duration}
			creationDate={item.creationDate}
		/>
	));

	function searchCourses(e) {
		e.preventDefault();
		if (query.length) {
			const searchResult = courses.filter(
				(course) =>
					course.title.toLowerCase().includes(query.toLowerCase()) ||
					course.id.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredCourses(searchResult);
		} else {
			setFilteredCourses(courses);
		}
	}

	return (
		<>
			<header className='courses_header'>
				<SearchBar
					query={query}
					setQuery={setQuery}
					handleSubmit={searchCourses}
				/>
				{userRole === 'admin' && (
					<Link to='/courses/add'>
						<Button buttonText='Add new course' className='btn_add' />
					</Link>
				)}
			</header>
			<div className='cards' data-testid='courses'>
				{courseList}
			</div>
		</>
	);
}

export default Courses;
