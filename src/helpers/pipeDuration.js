function pipeDuration(duration) {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	return `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}`;
}

export default pipeDuration;
