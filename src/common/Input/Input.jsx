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
			/>
		</>
	);
}

export default Input;
