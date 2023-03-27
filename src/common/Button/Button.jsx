import { PropTypes } from 'prop-types';
import './button.css';

function Button(props) {
	return (
		<button
			onClick={props.handleClick}
			className={props.className ? 'btn ' + props.className : 'btn'}
			type={props.type}
		>
			{props.buttonText}
		</button>
	);
}

Button.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	buttonText: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
};

export default Button;
