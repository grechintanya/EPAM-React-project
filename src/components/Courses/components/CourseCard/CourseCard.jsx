import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../common/Button/Button';
import { fetchCourseDelete } from '../../../../store/courses/thunk';
import {
	selectUserRole,
	selectUserToken,
	selectAllAuthors,
} from '../../../../store/selectors';
import pipeDuration from '../../../../helpers/pipeDuration';
import addAuthors from '../../../../helpers/addAuthors';
import dateGenerator from '../../../../helpers/dateGenerator';
import './courseCard.css';

function CourseCard(props) {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const token = useSelector(selectUserToken);
	const authors = useSelector(selectAllAuthors);

	return (
		<div className='card' data-testid='course-card'>
			<div className='card-left'>
				<h3 className='card-title' data-testid='title'>
					{props.title}
				</h3>
				<div className='description' data-testid='description'>
					{props.description}
				</div>
			</div>
			<div className='card-right'>
				<p className='card-info' data-testid='authors'>
					<span>Authors: </span>
					{addAuthors(props.authors, authors).join(', ')}
				</p>
				<p className='card-info' data-testid='duration'>
					<span>Duration: </span>
					{pipeDuration(props.duration)}
				</p>
				<p className='card-info' data-testid='creationDate'>
					<span>Created: </span>
					{dateGenerator(props.creationDate)}
				</p>
				<Link to={`/courses/${props.courseID}`}>
					<Button buttonText='Show Course' className='btn_right' />
				</Link>

				{userRole === 'admin' && (
					<>
						<Button
							handleClick={() =>
								dispatch(fetchCourseDelete(props.courseID, token))
							}
							className='btn_icon'
						>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
						<Link to={`/courses/update/${props.courseID}`}>
							<Button className='btn_icon'>
								<FontAwesomeIcon icon={faPen} />
							</Button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

CourseCard.propTypes = {
	title: PropTypes.string,
	courseID: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.arrayOf(PropTypes.string),
	duration: PropTypes.number,
	creationDate: PropTypes.string,
};

export default CourseCard;
