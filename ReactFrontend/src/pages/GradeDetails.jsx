import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGradeById } from '../api/gradeApi';

export default function GradeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getGradeById(id)
      .then(data => setGrade(data))
      .catch(() => setError('Grade not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!grade) return null;

  return (
    <div className="container">
      <h1 className="mb-4">Grade Details</h1>

      <table className="table table-bordered w-50">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{grade.id}</td>
          </tr>
          <tr>
            <th>Student</th>
            <td>
              {grade.studentName} (ID: {grade.studentId})
            </td>
          </tr>
          <tr>
            <th>Discipline</th>
            <td>
              {grade.disciplineName} (ID: {grade.disciplineId})
            </td>
          </tr>
          <tr>
            <th>Grade</th>
            <td>
              <strong>{grade.value}</strong>
            </td>
          </tr>
          <tr>
            <th>Date</th>
            <td>
              {grade.date
                ? new Date(grade.date).toLocaleDateString()
                : '—'}
            </td>
          </tr>
        </tbody>
      </table>

      <button
        className="btn btn-secondary"
        onClick={() => navigate('/grades')}
      >
        ⬅ Back to Grades
      </button>
    </div>
  );
}


