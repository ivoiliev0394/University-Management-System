import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">
          University Management System
        </h1>
        <p className="lead text-muted">
          Centralized system for managing students, teachers, disciplines and grades
        </p>
      </div>

      {isAuthenticated ? (
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">My Profile</h5>
                <p className="card-text">
                  View your personal information and related data.
                </p>
                <Link to="/profile" className="btn btn-primary">
                  Open
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Students</h5>
                <p className="card-text">
                  Browse and manage students information.
                </p>
                <Link to="/students" className="btn btn-outline-primary">
                  View Students
                </Link>
              </div>
            </div>
          </div>

          {(user?.roles?.includes('Admin') ||
            user?.roles?.includes('Teacher')) && (
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Administration</h5>
                  <p className="card-text">
                    Manage teachers, disciplines and grades.
                  </p>
                  <Link to="/teachers" className="btn btn-outline-dark">
                    Open Panel
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p className="lead">
            Please log in to access the system.
          </p>

          <Link to="/login" className="btn btn-primary me-2">
            Login
          </Link>

          <Link to="/register" className="btn btn-outline-secondary">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
