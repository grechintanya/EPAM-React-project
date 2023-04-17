import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/selectors';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const role = useSelector(selectUserRole);
	if (role === 'admin') {
		return <>{children}</>;
	} else {
		return <Navigate to='/courses' />;
	}
};

export default PrivateRoute;
