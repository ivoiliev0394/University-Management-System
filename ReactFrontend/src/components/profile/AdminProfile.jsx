export default function AdminProfile({ data }) {
  return (
    <div className="card mt-3">
      <div className="card-header bg-dark text-light">
        <h5 className="mb-0">Admin Information</h5>
      </div>

      <div className="card-body">
        <p className="card-text">
          <strong>Created On:</strong>{' '}
          {new Date(data.createdOn).toLocaleDateString()}
        </p>

        <p className="card-text">
          <strong>Active:</strong>{' '}
          {data.isDeactivated ? (
            <span className="badge bg-danger">No</span>
          ) : (
            <span className="badge bg-success">Yes</span>
          )}
        </p>
      </div>
    </div>
  );
}

