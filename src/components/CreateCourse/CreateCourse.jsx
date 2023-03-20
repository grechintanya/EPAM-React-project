import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Textarea from '../../common/Textarea/Textarea';
import { mockedAuthorsList } from '../../constants';
import pipeDuration from '../../helpers/pipeDuration';
import './createCourse.css';

function CreateCourse({ courseData, setCourseData, handleSubmit }) {
	const [authorName, setAuthorName] = useState('');

	const [authors, setAuthors] = useState(mockedAuthorsList);
	const authorsList = authors.map((author) => {
		return (
			<div className='author' key={author.id}>
				<p>{author.name}</p>
				<Button
					buttonText='Add author'
					type='button'
					handleClick={() => {
						setCourseData({
							...courseData,
							authors: [
								...courseData.authors,
								{ id: author.id, name: author.name },
							],
						});
						setAuthors((prev) => [
							...prev.filter((item) => !(item.id === author.id)),
						]);
					}}
				/>
			</div>
		);
	});

	const courseAuthors = courseData.authors.map((author) => {
		return (
			<div className='author' key={author.id}>
				<p>{author.name}</p>
				<Button
					buttonText='Delete author'
					type='button'
					handleClick={() => {
						setCourseData({
							...courseData,
							authors: [
								...courseData.authors.filter(
									(item) => !(item.id === author.id)
								),
							],
						});
						setAuthors([...authors, author]);
					}}
				/>
			</div>
		);
	});

	function createAuthor() {
		const newAuthor = { id: uuidv4(), name: authorName };
		setAuthors([...authors, newAuthor]);
		setAuthorName('');
		mockedAuthorsList.push(newAuthor);
	}

	return (
		<form className='create_course' onSubmit={(e) => handleSubmit(e)}>
			<div className='form_header'>
				<div>
					<Input
						labelText='Title'
						placeholderText='Enter title...'
						id='course_title'
						value={courseData.courseTitle}
						handleChange={(e) =>
							setCourseData({ ...courseData, title: e.target.value })
						}
					/>
				</div>
				<Button buttonText='Create Course' type='submit' />
			</div>
			<Textarea
				labelText='Description'
				name='description'
				placeholderText='Enter description'
				value={courseData.description}
				handleChange={(e) =>
					setCourseData({ ...courseData, description: e.target.value })
				}
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
							value={courseData.duration}
							handleChange={(e) =>
								setCourseData({ ...courseData, duration: e.target.value })
							}
						/>
						<p className='duration'>
							Duration: <span>{pipeDuration(courseData.duration)}</span> hours
						</p>
					</div>
				</div>
				<div className='course_info_item'>
					<h3 className='form_heading'>Authors</h3>
					<div className='authors'>{authorsList}</div>
					<h3 className='form_heading'>Course authors</h3>
					{courseData.authors.length ? (
						courseAuthors
					) : (
						<p>Author list is empty</p>
					)}
				</div>
			</div>
		</form>
	);
}

export default CreateCourse;
