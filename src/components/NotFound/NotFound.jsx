import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<main>
			<h1>Page not found</h1>
			<p>
				Return to the <Link to='/courses'>courses</Link>
			</p>
		</main>
	);
}

export default NotFound;
