export default function AdminProfile({ data }) {
  return (
    <div>
      <h2>Admin Info</h2>
      <p><strong>Created On:</strong> {new Date(data.createdOn).toLocaleDateString()}</p>
      <p><strong>Active:</strong> {data.isDeactivated ? 'No' : 'Yes'}</p>
    </div>
  );
}
