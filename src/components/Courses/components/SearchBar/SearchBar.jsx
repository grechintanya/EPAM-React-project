import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import './searchBar.css';

function SearchBar(props) {
	return (
		<form className='search' onSubmit={props.handleSubmit}>
			<Input
				placeholderText='Enter course name...'
				value={props.query}
				handleChange={(e) => props.setQuery(e.target.value)}
				id='search_input'
			/>
			<Button buttonText='Search' />
		</form>
	);
}

export default SearchBar;
