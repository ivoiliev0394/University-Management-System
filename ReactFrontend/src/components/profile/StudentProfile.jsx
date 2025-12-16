export default function StudentProfile({ data }) {
  return (
    <div>
      <h2>Student Info</h2>

      <p><strong>Faculty №:</strong> {data.facultyNumber}</p>
      <p><strong>Name:</strong> {data.firstName} {data.middleName} {data.lastName}</p>
      <p><strong>Major:</strong> {data.major}</p>
      <p><strong>Course:</strong> {data.course}</p>
      <p><strong>Address:</strong> {data.address}</p>

      <h3>Grades</h3>
      <ul>
        {data.grades.map(g => (
          <li key={g.disciplineId}>
            {g.disciplineName} – {g.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
