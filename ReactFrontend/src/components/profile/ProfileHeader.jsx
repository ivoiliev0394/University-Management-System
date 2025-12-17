export default function ProfileHeader({ email, role }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Profile Overview</h5>

        <p className="mb-1">
          <strong>Email:</strong> {email}
        </p>

        <p className="mb-0">
          <strong>Role:</strong> {role}
        </p>
      </div>
    </div>
  );
}
