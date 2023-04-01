import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import addAuthors from '../../helpers/addAuthors';
import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';
import './courseInfo.css';

function CourseInfo({ courses }) {
	const { courseID } = useParams();
	let course = useMemo(
		() => courses.find((item) => item.id === courseID),
		[courseID, courses]
	);
	let authorList;
	if (!course) {
		throw new Response('', {
			statusText: `Course ${courseID} not found`,
		});
	} else {
		authorList = addAuthors(course.authors, courses).map((author, i) => (
			<p key={i}>{author}</p>
		));
	}
	return (
		<>
			<Link to='/courses' className='link'>
				<FontAwesomeIcon icon={faArrowLeft} /> Back to courses
			</Link>
			<h1 className='heading'>{course.title}</h1>
			<div className='course'>
				<div className='course-left'>{course.description}</div>
				<div className='course-right'>
					<div className='info'>
						<span>ID: </span>
						{course.id}
					</div>
					<div className='info'>
						<span>Duration: </span>
						{pipeDuration(course.duration) + ' hours'}
					</div>
					<div className='info'>
						<span>Created: </span>
						{dateGenerator(course.creationDate)}
					</div>
					<div className='info'>
						<span>Authors: </span>
						{authorList}
					</div>
				</div>
			</div>
		</>
	);
}

export default CourseInfo;
