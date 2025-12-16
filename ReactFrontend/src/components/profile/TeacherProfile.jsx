export default function TeacherProfile({ data }) {
  return (
    <div>
      <h2>Teacher Info</h2>

      <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
      <p><strong>Department:</strong> {data.department}</p>

      <h3>Disciplines</h3>
      <ul>
        {data.disciplines.map(d => (
          <li key={d.id}>
            {d.name} (Semester {d.semester}, {d.credits} credits)
          </li>
        ))}
      </ul>
    </div>
  );
}
