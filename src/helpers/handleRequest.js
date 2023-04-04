const BASIC_URL = 'http://localhost:4000';

const handleRequest = async (user, url) => {
	const response = await fetch(`${BASIC_URL}/${url}`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	if (!response.ok) {
		if (result && result.errors) {
			alert(result.errors);
		} else {
			alert('Invalid data');
		}
	} else {
		return result;
	}
};

export default handleRequest;
