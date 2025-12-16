import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDisciplineById } from '../api/disciplineApi';

export default function DisciplineDetails() {
  const { id } = useParams();
  const [discipline, setDiscipline] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getDisciplineById(id)
      .then(setDiscipline)
      .catch(() => setError('Discipline not found'));
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!discipline) return <p>Loading...</p>;

  return (
    <div>
      <h3>{discipline.name}</h3>

      <p><strong>Semester:</strong> {discipline.semester}</p>
      <p><strong>Credits:</strong> {discipline.credits}</p>
      <p><strong>Teacher ID:</strong> {discipline.teacherId}</p> 

     <Link to="/disciplines">⬅ Back to Disciplines</Link>
    </div>
  );
}
