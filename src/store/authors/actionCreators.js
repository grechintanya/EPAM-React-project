import { GET_AUTHORS, SAVE_AUTHOR } from './actionTypes';

export const getAllAuthors = (authors) => ({
	type: GET_AUTHORS,
	payload: authors,
});

export const newAuthorSaved = (author) => ({
	type: SAVE_AUTHOR,
	payload: author,
});
