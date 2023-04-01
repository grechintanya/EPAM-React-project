import { Link, useRouteError } from 'react-router-dom';

function NotFound() {
	const error = useRouteError();
	return (
		<main>
			<h1>{error.statusText || 'Page not found'}</h1>
			<p>
				Return to the <Link to='/courses'>courses</Link>
			</p>
		</main>
	);
}

export default NotFound;
