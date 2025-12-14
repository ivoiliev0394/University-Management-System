import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>

      {isAuthenticated && (
        <>
          {" | "}
          <Link to="/students">Students</Link>
          {" | "}
          <button onClick={logout} style={{ cursor: 'pointer' }}>
            Logout
          </button>
        </>
      )}

      {!isAuthenticated && (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

