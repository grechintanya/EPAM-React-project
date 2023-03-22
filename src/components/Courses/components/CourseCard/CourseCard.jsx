import Button from '../../../../common/Button/Button';
import './courseCard.css';

function CourseCard(props) {
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
				<Button buttonText='Show Course' className='btn_center' />
			</div>
		</div>
	);
}

export default CourseCard;
