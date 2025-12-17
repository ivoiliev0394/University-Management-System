import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDisciplineById } from '../../api/disciplineApi';

export default function DisciplineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discipline, setDiscipline] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDisciplineById(id)
      .then(data => setDiscipline(data))
      .catch(() => setError('Discipline not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!discipline) return null;

  return (
    <div className="container">
      <h1 className="mb-4">Discipline Details</h1>

      {/* 🔙 Back */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <table className="table table-bordered w-50">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{discipline.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{discipline.name}</td>
          </tr>
          <tr>
            <th>Semester</th>
            <td>{discipline.semester}</td>
          </tr>
          <tr>
            <th>Credits</th>
            <td>{discipline.credits}</td>
          </tr>
          <tr>
            <th>Teacher</th>
            <td>
              {discipline.teacherName
                ? discipline.teacherName
                : `ID: ${discipline.teacherId}`}
            </td>
          </tr>
        </tbody>
      </table>

      <button
        className="btn btn-secondary"
        onClick={() => navigate('/disciplines')}
      >
        ⬅ Back to Disciplines
      </button>
    </div>
  );
}

