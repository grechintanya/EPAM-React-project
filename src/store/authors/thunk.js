import { handleRequest, fetchAuthors } from '../../services';
import { getAllAuthors, newAuthorSaved } from './actionCreators';

export const fetchAllAuthors = () => async (dispatch) => {
	const result = await fetchAuthors();
	if (result?.successful) {
		dispatch(getAllAuthors(result.result));
	}
};

export const fetchAuthorCreate = (author, token) => async (dispatch) => {
	const options = {
		method: 'POST',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(author),
	};
	const response = await handleRequest('authors/add', options);
	dispatch(newAuthorSaved(response.result));
};
