import { PropTypes } from 'prop-types';
import './input.css';

function Input(props) {
	return (
		<>
			<label htmlFor={props.id}>{props.labelText}</label>
			<input
				type={props.type ? props.type : 'text'}
				value={props.value}
				placeholder={props.placeholderText}
				className={props.className ? 'input ' + props.className : 'input'}
				onChange={props.handleChange}
				id={props.id}
				required={props.required}
			/>
		</>
	);
}

Input.propTypes = {
	id: PropTypes.string,
	labelText: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string,
	placeholderText: PropTypes.string,
	className: PropTypes.string,
	required: PropTypes.bool,
	handleChange: PropTypes.func,
};

export default Input;
