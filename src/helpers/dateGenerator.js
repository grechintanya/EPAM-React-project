function dateGenerator(dateString) {
	const arr = dateString?.split('/').map((item) => item.padStart(2, '0'));
	return arr?.join('.');
}

export default dateGenerator;
