import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById } from '../api/studentApi';
import { useAuth } from '../contexts/AuthContext';

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="container">
      <h1 className="mb-3">Student Details</h1>

      {/* 🔙 Back */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card col-md-6 mb-4">
        <div className="card-body">
          <p><strong>Faculty Number:</strong> {student.facultyNumber}</p>
          <p>
            <strong>Name:</strong>{' '}
            {student.firstName} {student.middleName} {student.lastName}
          </p>
          <p><strong>Major:</strong> {student.major}</p>
          <p><strong>Course:</strong> {student.course}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Address:</strong> {student.address}</p>
        </div>
      </div>

      <h2 className="mb-3">Grades</h2>

      {student.grades?.length === 0 && (
        <p className="text-muted">No grades yet</p>
      )}

      {student.grades?.length > 0 && (
        <table className="table table-striped table-bordered col-md-8">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Discipline</th>
              <th>Grade</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {student.grades.map((g, index) => (
              <tr key={`${g.disciplineId}-${index}`}>
                <td>{index + 1}</td>
                <td>{g.discipline}</td>
                <td>{g.value}</td>
                <td>{new Date(g.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
