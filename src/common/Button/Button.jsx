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

export default Button;
