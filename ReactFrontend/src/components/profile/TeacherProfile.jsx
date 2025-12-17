export default function TeacherProfile({ data }) {
  return (
    <div className="mt-4">
      <h2 className="mb-3">Teacher Information</h2>

      <table className="table table-bordered w-50">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{data.firstName} {data.lastName}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>{data.department}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="mt-4">Disciplines</h3>

      {data.disciplines?.length === 0 && (
        <p>No disciplines assigned.</p>
      )}

      {data.disciplines?.length > 0 && (
        <table className="table table-striped w-75">
          <thead>
            <tr>
              <th>Name</th>
              <th>Semester</th>
              <th>Credits</th>
            </tr>
          </thead>
          <tbody>
            {data.disciplines.map(d => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.semester}</td>
                <td>{d.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
