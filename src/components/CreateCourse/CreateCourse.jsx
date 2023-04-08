import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Textarea from '../../common/Textarea/Textarea';
import pipeDuration from '../../helpers/pipeDuration';
import './createCourse.css';
import { newCourseSaved } from '../../store/courses/actionCreators';
import { newAuthorSaved } from '../../store/authors/actionCreators';
import { selectAllAuthors } from '../../store/selectors';

function CreateCourse() {
	const allAuthors = useSelector(selectAllAuthors);
	const [authorName, setAuthorName] = useState('');
	const [authors, setAuthors] = useState(allAuthors);
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [courseDuration, setCourseDuration] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const sample = /[a-z]{2,}/gi;

	const handleAddAuthor = (author) => {
		setCourseAuthors([...courseAuthors, { id: author.id, name: author.name }]);
		setAuthors(authors.filter((item) => item.id !== author.id));
	};

	const handleDeleteAuthor = (author) => {
		setCourseAuthors(courseAuthors.filter((item) => item.id !== author.id));
		setAuthors([...authors, author]);
	};

	function saveNewCourse(e) {
		e.preventDefault();
		let isFormValid = true;
		const fields = [
			courseTitle,
			courseDescription,
			courseDuration,
			courseAuthors,
		];
		for (const field of fields) {
			if (!field.length) {
				alert('Please, fill in all fields');
				isFormValid = false;
				break;
			}
		}
		if (!sample.test(courseTitle)) {
			alert('Title length should be at least 2 letters');
			isFormValid = false;
		}
		if (!sample.test(courseDescription)) {
			alert('Description length should be at least 2 letters');
			isFormValid = false;
		}
		if (courseDuration < 2) {
			alert('Duration should be at least 2 minutes');
			isFormValid = false;
		}
		if (isFormValid) {
			const newCourse = {
				id: uuidv4(),
				title: courseTitle,
				description: courseDescription,
				creationDate: new Date().toLocaleDateString().replaceAll('.', '/'),
				duration: Number(courseDuration),
				authors: courseAuthors.map((item) => item.id),
			};
			dispatch(newCourseSaved(newCourse));
			navigate('/courses');
		}
	}

	const renderAuthor = (author, text, handler) => {
		return (
			<div className='author' key={author.id}>
				<p>{author.name}</p>
				<Button
					buttonText={text}
					type='button'
					handleClick={() => handler(author)}
				/>
			</div>
		);
	};

	const authorsList = authors.map((author) =>
		renderAuthor(author, 'Add author', handleAddAuthor)
	);

	const courseAuthorsList = courseAuthors.map((author) =>
		renderAuthor(author, 'Delete author', handleDeleteAuthor)
	);

	function createAuthor() {
		if (sample.test(authorName)) {
			const newAuthor = { id: uuidv4(), name: authorName };
			dispatch(newAuthorSaved(newAuthor));
			setAuthors([...authors, newAuthor]);
			setAuthorName('');
		} else {
			alert("Author's name length should be at least 2 letters");
		}
	}

	return (
		<>
			<h1 className='heading'>Add a new course</h1>
			<form className='create_course' onSubmit={(e) => saveNewCourse(e)}>
				<div className='form_header'>
					<div>
						<Input
							labelText='Title'
							placeholderText='Enter title...'
							id='course_title'
							value={courseTitle}
							handleChange={(e) => setCourseTitle(e.target.value)}
							required
						/>
					</div>
					<div className='buttons'>
						<Link to='/courses'>
							<Button buttonText='Cancel' type='button' />
						</Link>
						<Button buttonText='Create Course' type='submit' />
					</div>
				</div>
				<Textarea
					labelText='Description'
					id='description'
					placeholderText='Enter description'
					value={courseDescription}
					handleChange={(e) => setCourseDescription(e.target.value)}
					required
				/>
				<div className='course_info'>
					<div className='course_info_item'>
						<div>
							<h3 className='form_heading'>Add author</h3>
							<Input
								labelText='Author name'
								placeholderText='Enter author name...'
								id='author_name'
								value={authorName}
								handleChange={(e) => setAuthorName(e.target.value)}
							/>
							<Button
								buttonText='Create author'
								className='btn_center'
								handleClick={createAuthor}
								type='button'
							/>
						</div>
						<div>
							<h3 className='form_heading'>Duration</h3>
							<Input
								labelText='Duration'
								placeholderText='Enter duration in minutes...'
								id='duration'
								type='number'
								value={courseDuration}
								handleChange={(e) => setCourseDuration(e.target.value)}
								required
							/>
							<p className='duration'>
								Duration: <span>{pipeDuration(courseDuration)}</span> hours
							</p>
						</div>
					</div>
					<div className='course_info_item'>
						<h3 className='form_heading'>Authors</h3>
						<div className='authors'>{authorsList}</div>
						<h3 className='form_heading'>Course authors</h3>
						{courseAuthors.length ? (
							courseAuthorsList
						) : (
							<p>Author list is empty</p>
						)}
					</div>
				</div>
			</form>
		</>
	);
}

export default CreateCourse;
