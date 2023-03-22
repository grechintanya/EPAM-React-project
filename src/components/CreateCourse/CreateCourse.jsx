import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Textarea from '../../common/Textarea/Textarea';
import { mockedAuthorsList } from '../../constants';
import pipeDuration from '../../helpers/pipeDuration';
import './createCourse.css';

function CreateCourse(props) {
	const [authorName, setAuthorName] = useState('');
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const handleAddAuthor = (author) => {
		props.setCourseAuthors([
			...props.courseAuthors,
			{ id: author.id, name: author.name },
		]);
		setAuthors([...authors.filter((item) => !(item.id === author.id))]);
	};

	const handleDeleteAuthor = (author) => {
		props.setCourseAuthors([
			...props.courseAuthors.filter((item) => !(item.id === author.id)),
		]);
		setAuthors([...authors, author]);
	};

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

	const courseAuthorsList = props.courseAuthors.map((author) =>
		renderAuthor(author, 'Delete author', handleDeleteAuthor)
	);

	function createAuthor() {
		if (authorName.length > 2) {
			const newAuthor = { id: uuidv4(), name: authorName };
			setAuthors([...authors, newAuthor]);
			setAuthorName('');
		} else {
			alert('Description length should be at least 2 characters');
		}
	}

	return (
		<form className='create_course' onSubmit={(e) => props.handleSubmit(e)}>
			<div className='form_header'>
				<div>
					<Input
						labelText='Title'
						placeholderText='Enter title...'
						id='course_title'
						value={props.courseTitle}
						handleChange={(e) => props.setCourseTitle(e.target.value)}
					/>
				</div>
				<div className='buttons'>
					<Button
						buttonText='Cancel'
						type='button'
						handleClick={() => props.setNewCourseForm(!props.newCourseForm)}
					/>
					<Button buttonText='Create Course' type='submit' />
				</div>
			</div>
			<Textarea
				labelText='Description'
				name='description'
				placeholderText='Enter description'
				value={props.courseDescription}
				handleChange={(e) => props.setCourseDescription(e.target.value)}
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
							value={props.courseDuration}
							handleChange={(e) => props.setCourseDuration(e.target.value)}
						/>
						<p className='duration'>
							Duration: <span>{pipeDuration(props.courseDuration)}</span> hours
						</p>
					</div>
				</div>
				<div className='course_info_item'>
					<h3 className='form_heading'>Authors</h3>
					<div className='authors'>{authorsList}</div>
					<h3 className='form_heading'>Course authors</h3>
					{props.courseAuthors.length ? (
						courseAuthorsList
					) : (
						<p>Author list is empty</p>
					)}
				</div>
			</div>
		</form>
	);
}

export default CreateCourse;
