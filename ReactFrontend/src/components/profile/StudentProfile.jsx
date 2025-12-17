export default function StudentProfile({ data }) {
  return (
    <div className="mt-4">
      <h2 className="mb-3">Student Information</h2>

      <table className="table table-bordered w-50">
        <tbody>
          <tr>
            <th>Faculty №</th>
            <td>{data.facultyNumber}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>
              {data.firstName} {data.middleName} {data.lastName}
            </td>
          </tr>
          <tr>
            <th>Major</th>
            <td>{data.major}</td>
          </tr>
          <tr>
            <th>Course</th>
            <td>{data.course}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{data.address}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="mt-4">Grades</h3>

      {data.grades?.length === 0 && (
        <p>No grades available.</p>
      )}

      {data.grades?.length > 0 && (
        <table className="table table-striped w-75">
          <thead>
            <tr>
              <th>Discipline</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.grades.map((g, index) => (
              <tr key={`${g.disciplineId}-${index}`}>
                <td>{g.discipline}</td>
                <td>
                  <strong>{g.value}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
