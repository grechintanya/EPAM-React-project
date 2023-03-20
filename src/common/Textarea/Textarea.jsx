import './textarea.css';

function Textarea(props) {
	return (
		<>
			<label htmlFor={props.id}>{props.labelText}</label>
			<textarea
				name={props.name}
				placeholder={props.placeholderText}
				id={props.id}
				onChange={props.handleChange}
				value={props.value}
			></textarea>
		</>
	);
}

export default Textarea;
