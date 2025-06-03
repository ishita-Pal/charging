import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
