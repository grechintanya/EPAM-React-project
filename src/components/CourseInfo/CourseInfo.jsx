import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import addAuthors from '../../helpers/addAuthors';
import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';
import { selectAllAuthors, selectCourseByID } from '../../store/selectors';
import './courseInfo.css';

function CourseInfo() {
	const { courseID } = useParams();
	let course = useSelector(selectCourseByID(courseID));
	const authors = useSelector(selectAllAuthors);

	let authorList;
	if (!course) {
		throw new Response('', {
			statusText: `Course ${courseID} not found`,
		});
	} else {
		authorList = addAuthors(course.authors, authors).map((author, i) => (
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
