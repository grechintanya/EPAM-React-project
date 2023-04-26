import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Textarea from '../../common/Textarea/Textarea';
import pipeDuration from '../../helpers/pipeDuration';
import './courseForm.css';
import { fetchAuthorCreate } from '../../store/authors/thunk';
import {
	selectAllAuthors,
	selectCourseByID,
	selectUserToken,
} from '../../store/selectors';
import {
	fetchCourseUpdate,
	fetchCourseCreate,
} from '../../store/courses/thunk';

function CourseForm() {
	const { courseID } = useParams();
	let course = useSelector(selectCourseByID(courseID));
	const allAuthors = useSelector(selectAllAuthors);
	const token = useSelector(selectUserToken);
	const [authorName, setAuthorName] = useState('');
	const [courseTitle, setCourseTitle] = useState(course?.title || '');
	const [courseDescription, setCourseDescription] = useState(
		course?.description || ''
	);
	const [courseDuration, setCourseDuration] = useState(
		course?.duration.toString() || ''
	);

	const [courseAuthors, setCourseAuthors] = useState([]);
	const [authors, setAuthors] = useState(allAuthors);

	useEffect(() => {
		setCourseAuthors(
			course
				? allAuthors.filter((author) => course.authors.includes(author.id))
				: []
		);
		setAuthors(
			course
				? allAuthors.filter((author) => !course.authors.includes(author.id))
				: allAuthors
		);
	}, [allAuthors]);

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

	function saveCourse(e) {
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
				title: courseTitle,
				description: courseDescription,
				creationDate: new Date().toLocaleDateString().replaceAll('.', '/'),
				duration: Number(courseDuration),
				authors: courseAuthors.map((item) => item.id),
			};
			if (course) {
				dispatch(fetchCourseUpdate(courseID, newCourse, token));
			} else {
				dispatch(fetchCourseCreate(newCourse, token));
			}

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
			const newAuthor = { name: authorName };
			dispatch(fetchAuthorCreate(newAuthor, token));
			setAuthorName('');
		} else {
			alert("Author's name length should be at least 2 letters");
		}
	}

	return (
		<>
			<h1 className='heading'>
				{course ? `Edit the ${course.title} course` : 'Add a new course'}
			</h1>
			<form
				className='create_course'
				onSubmit={(e) => saveCourse(e)}
				data-testid='course-form'
			>
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
						<Button
							buttonText={course ? 'Update Course' : 'Create Course'}
							type='submit'
						/>
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

export default CourseForm;
