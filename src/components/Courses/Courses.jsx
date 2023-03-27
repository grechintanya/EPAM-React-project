import { useState } from 'react';
import { Link } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import addAuthors from '../../helpers/addAuthors';
import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import './courses.css';

function Courses({ courses, setCourses }) {
	const [query, setQuery] = useState('');

	const renderCorsecard = (item, i) => {
		return (
			<CourseCard
				key={i}
				title={item.title}
				courseID={item.id}
				description={item.description}
				authors={addAuthors(item.authors, mockedAuthorsList).join(', ')}
				duration={pipeDuration(item.duration)}
				creationDate={dateGenerator(item.creationDate)}
			/>
		);
	};

	const courseList = courses.map((item, i) => renderCorsecard(item, i));

	function searchCourses(e) {
		e.preventDefault();
		if (query.length) {
			const courses = mockedCoursesList.filter(
				(course) =>
					course.title.toLowerCase().includes(query.toLowerCase()) ||
					course.id.toLowerCase().includes(query.toLowerCase())
			);

			setCourses(courses);
		} else {
			setCourses(mockedCoursesList);
		}
	}

	return (
		<main className='courses'>
			<header>
				<SearchBar
					query={query}
					setQuery={setQuery}
					handleSubmit={searchCourses}
				/>
				<Link to='/courses/add'>
					<Button buttonText='Add new course' className='btn_add' />
				</Link>
			</header>
			<div className='cards'>{courseList}</div>
		</main>
	);
}

export default Courses;
