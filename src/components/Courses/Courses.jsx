import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CourseCard from './components/CourseCard/CourseCard';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import addAuthors from '../../helpers/addAuthors';
import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import './courses.css';

function Courses() {
	const [query, setQuery] = useState('');
	const [courses, setCourses] = useState(mockedCoursesList);
	const [newCourseForm, setNewCourseForm] = useState(false);
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [courseDuration, setCourseDuration] = useState('');

	const renderCorsecard = (item, i) => {
		return (
			<CourseCard
				key={i}
				title={item.title}
				description={item.description}
				authors={addAuthors(item.authors, mockedAuthorsList)}
				duration={pipeDuration(item.duration)}
				creationDate={dateGenerator(item.creationDate)}
			/>
		);
	};

	const courseList = courses.map((item, i) => renderCorsecard(item, i));

	function searchCourses(e) {
		e.preventDefault();
		if (query.length) {
			const courses = mockedCoursesList.filter((course) => {
				return (
					course.title.toLowerCase().includes(query.toLowerCase()) ||
					course.id.toLowerCase().includes(query.toLowerCase())
				);
			});
			setCourses(courses);
		} else {
			setCourses(mockedCoursesList);
		}
	}

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
		if (courseTitle.length < 2) {
			alert('Title length should be at least 2 characters');
			isFormValid = false;
		} else if (courseDescription.length < 2) {
			alert('Description length should be at least 2 characters');
			isFormValid = false;
		} else if (courseDuration < 2) {
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
			setCourses([...courses, newCourse]);
			setNewCourseForm(!newCourseForm);
		}
	}

	return (
		<div className='courses'>
			{!newCourseForm ? (
				<>
					<header>
						<SearchBar
							query={query}
							setQuery={setQuery}
							handleSubmit={searchCourses}
						/>
						<Button
							buttonText='Add new course'
							className='btn_add'
							handleClick={() => setNewCourseForm(!newCourseForm)}
						/>
					</header>
					<div className='cards'>{courseList}</div>
				</>
			) : (
				<CreateCourse
					courseTitle={courseTitle}
					setCourseTitle={setCourseTitle}
					courseDescription={courseDescription}
					setCourseDescription={setCourseDescription}
					courseAuthors={courseAuthors}
					setCourseAuthors={setCourseAuthors}
					courseDuration={courseDuration}
					setCourseDuration={setCourseDuration}
					handleSubmit={saveNewCourse}
					newCourseForm={newCourseForm}
					setNewCourseForm={setNewCourseForm}
				/>
			)}
		</div>
	);
}

export default Courses;
