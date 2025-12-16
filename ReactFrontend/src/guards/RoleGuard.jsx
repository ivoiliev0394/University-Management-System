import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RoleGuard({ roles, children }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const hasRole = roles.some(r => user?.roles?.includes(r));

  if (!hasRole) {
    return <Navigate to="/" />;
  }

  return children;
}
