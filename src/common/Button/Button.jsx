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
			{props.children}
		</button>
	);
}

Button.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	buttonText: PropTypes.string,
	handleClick: PropTypes.func,
	children: PropTypes.element,
};

export default Button;
