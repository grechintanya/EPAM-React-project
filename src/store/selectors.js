export const selectUserName = (state) => state.user?.name;
export const selectUserToken = (state) => state.user?.token;
export const selectAllAuthors = (state) => state.authors;
export const selectAllCourses = (state) => state.courses;
export const selectCourseByID = (courseID) => (state) => {
	return state.courses.find((item) => item.id === courseID);
};
