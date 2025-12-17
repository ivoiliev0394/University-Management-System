import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  const isAdmin = user?.roles?.includes('Admin');
  const canSeeUsers =
    user?.roles?.includes('Admin') ||
    user?.roles?.includes('Teacher');

    const canSeeTeachers =
  user?.roles?.includes('Admin') ||
  user?.roles?.includes('Teacher') ||
  user?.roles?.includes('Student');
  const canSeeReports =
  user?.roles?.includes('Admin') ||
  user?.roles?.includes('Teacher') ||
  user?.roles?.includes('Student');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          University System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/students">
                    Students
                  </Link>
                </li>

                {canSeeTeachers && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/teachers">
                        Teachers
                      </Link>
                    </li>
                  )}

                
                  <li className="nav-item">
                    <Link className="nav-link" to="/disciplines">
                      Disciplines
                    </Link>
                  </li>
                

                {canSeeUsers && (
                  <>                  
                    <li className="nav-item">
                      <Link className="nav-link" to="/grades">
                        Grades
                      </Link>
                    </li>
                  </>
                )}

                  {canSeeReports && (
                    <li className="nav-item">
                      <Link className="nav-link text-warning" to="/reports">
                        Reports
                      </Link>
                    </li>
                  )}

                {user?.roles?.includes('Admin') && (
                  <li className="nav-item">
                      <Link className="nav-link" to="/users">
                        Users
                      </Link>
                    </li>  
                )}
                
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    My Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}


