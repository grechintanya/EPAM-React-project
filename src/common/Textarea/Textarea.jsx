import { PropTypes } from 'prop-types';
import './textarea.css';

function Textarea(props) {
	return (
		<>
			<label htmlFor={props.id}>{props.labelText}</label>
			<textarea
				placeholder={props.placeholderText}
				id={props.id}
				onChange={props.handleChange}
				value={props.value}
			></textarea>
		</>
	);
}

Textarea.propTypes = {
	id: PropTypes.string,
	labelText: PropTypes.string,
	placeholderText: PropTypes.string,
	value: PropTypes.string,
	handleChange: PropTypes.func,
};

export default Textarea;
