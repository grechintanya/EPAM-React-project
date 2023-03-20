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
	const [courseData, setCourseData] = useState({
		title: '',
		description: '',
		authors: [],
		duration: '',
	});
	const courseList = courses.map((item, i) => {
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
	});

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
		for (const key in courseData) {
			if (!courseData[key].length) {
				alert('Please, fill in all fields');
				isFormValid = false;
				break;
			}
		}
		if (courseData.title.length < 2) {
			alert('Title length should be at least 2 characters');
			isFormValid = false;
		} else if (courseData.description.length < 2) {
			alert('Description length should be at least 2 characters');
			isFormValid = false;
		} else if (courseData.duration < 2) {
			alert('Duration should be at least 2 minutes');
			isFormValid = false;
		}
		if (isFormValid) {
			const newCourse = {
				id: uuidv4(),
				title: courseData.title,
				description: courseData.description,
				creationDate: new Date().toLocaleDateString().replaceAll('.', '/'),
				duration: Number(courseData.duration),
				authors: courseData.authors.map((item) => item.id),
			};
			setCourses([...courses, newCourse]);
			setNewCourseForm((prev) => !prev);
			mockedCoursesList.push(newCourse);
			console.log(mockedCoursesList);
		}
	}

	return (
		<div className='courses'>
			{newCourseForm || (
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
							handleClick={() => setNewCourseForm((prev) => !prev)}
						/>
					</header>
					<div className='cards'>{courseList}</div>
				</>
			)}
			{newCourseForm && (
				<CreateCourse
					courseData={courseData}
					setCourseData={setCourseData}
					handleSubmit={saveNewCourse}
				/>
			)}
		</div>
	);
}

export default Courses;
