function addAuthors(ids, authorsList) {
	const authors = authorsList
		.filter((item) => ids?.includes(item.id))
		.map((author) => author.name);
	return authors;
}

export default addAuthors;
