import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudentById } from '../api/studentApi';
import { useAuth } from '../contexts/AuthContext';

export default function StudentDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getStudentById(id, token)
      .then(data => {
        setStudent(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Student not found');
        setLoading(false);
      });
  }, [id, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Student Details</h1>

      <p><strong>Faculty Number:</strong> {student.facultyNumber}</p>
      <p><strong>Name:</strong> {student.firstName} {student.middleName} {student.lastName}</p>
      <p><strong>Major:</strong> {student.major}</p>
      <p><strong>Course:</strong> {student.course}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Address:</strong> {student.address}</p>

      <h2>Grades</h2>

      {student.grades?.length === 0 && (
        <p>No grades yet</p>
      )}

      {student.grades?.length > 0 && (
        <ul>
          {student.grades.map((g, index) => (
            <li key={`${g.disciplineId}-${index}`}>
              <strong>{g.disciplineName}</strong> – {g.value}
              {' '}({new Date(g.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      )}


      <br />
      <Link to="/students">⬅ Back to Students</Link>
    </div>
  );
}

