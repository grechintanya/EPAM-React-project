import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import addAuthors from '../../helpers/addAuthors';
import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';
import './courseInfo.css';
import NotFound from '../NotFound/NotFound';

function CourseInfo() {
	let { courseID } = useParams();
	let course = mockedCoursesList.find((item) => item.id === courseID);
	if (course) {
		const authorList = addAuthors(course.authors, mockedAuthorsList).map(
			(author, i) => <p key={i}>{author}</p>
		);
		return (
			<main>
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
			</main>
		);
	} else {
		return <NotFound />;
	}
}

export default CourseInfo;
