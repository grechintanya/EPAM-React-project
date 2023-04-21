import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import addAuthors from '../../helpers/addAuthors';
import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import {
	selectAllAuthors,
	selectAllCourses,
	selectUserRole,
} from '../../store/selectors';
import './courses.css';

function Courses() {
	const courses = useSelector(selectAllCourses);
	const authors = useSelector(selectAllAuthors);
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
			authors={addAuthors(item.authors, authors).join(', ')}
			duration={pipeDuration(item.duration)}
			creationDate={dateGenerator(item.creationDate)}
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
			<div className='cards'>{courseList}</div>
		</>
	);
}

export default Courses;
