import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  const canSeeUsers =
    user?.roles?.includes('Admin') ||
    user?.roles?.includes('Teacher');

  return (
    <nav>
      <Link to="/">Home</Link>

      {isAuthenticated && (
        <>
          {' | '}
          <Link to="/students">Students</Link>

          {canSeeUsers && (
            <>
              {' | '}
              <Link to="/users">Users</Link>
              {' | '}
              <Link to="/teachers">Teachers</Link>
              {' | '}
              <Link to="/disciplines">Disciplines</Link>
              {' | '}
              <Link to="/grades">Grades</Link>
            </>
          )}

          {' | '}
          <Link to="/profile">My Profile</Link>

          {' | '}
          <button onClick={logout}>Logout</button>
        </>
      )}

      {!isAuthenticated && (
        <>
          {' | '}
          <Link to="/login">Login</Link>
          {' | '}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}


