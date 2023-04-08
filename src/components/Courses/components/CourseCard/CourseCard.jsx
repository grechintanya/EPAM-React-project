import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../common/Button/Button';
import { courseDeleted } from '../../../../store/courses/actionCreators';
import './courseCard.css';

function CourseCard(props) {
	const dispatch = useDispatch();

	return (
		<div className='card'>
			<div className='card-left'>
				<h3 className='card-title'>{props.title}</h3>
				<div className='description'>{props.description}</div>
			</div>
			<div className='card-right'>
				<p className='card-info'>
					<span>Authors: </span>
					{props.authors}
				</p>
				<p className='card-info'>
					<span>Duration: </span>
					{props.duration}
				</p>
				<p className='card-info'>
					<span>Created: </span>
					{props.creationDate}
				</p>
				<Link to={`/courses/${props.courseID}`}>
					<Button buttonText='Show Course' className='btn_right' />
				</Link>
				<Button
					handleClick={() => dispatch(courseDeleted(props.courseID))}
					className='btn_icon'
				>
					<FontAwesomeIcon icon={faTrash} />
				</Button>
				<Button className='btn_icon'>
					<FontAwesomeIcon icon={faPen} />
				</Button>
			</div>
		</div>
	);
}

CourseCard.propTypes = {
	title: PropTypes.string,
	courseID: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.string,
	duration: PropTypes.string,
	creationDate: PropTypes.string,
};

export default CourseCard;
