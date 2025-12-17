import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center"
         style={{ minHeight: '70vh' }}>
      
      <h1 className="display-4 text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>

      <p className="text-muted mb-4">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary">
        ⬅ Back to Home
      </Link>
    </div>
  );
}
