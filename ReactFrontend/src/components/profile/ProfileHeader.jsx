export default function ProfileHeader({ email, role }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Role:</strong> {role}</p>
      <hr />
    </div>
  );
}
