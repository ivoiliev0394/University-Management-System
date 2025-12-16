import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getAllDisciplines,
  deleteDiscipline
} from '../api/disciplineApi';

export default function Disciplines() {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDisciplines()
      .then(setDisciplines)
      .finally(() => setLoading(false));
  }, []);

  const onDelete = async (id) => {
    if (!confirm('Delete discipline?')) return;
    await deleteDiscipline(id);
    setDisciplines(disciplines.filter(d => d.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Disciplines</h1>

      <Link to="/disciplines/create">+ Create Discipline</Link>

      <ol>
        {disciplines.map(d => (
          <li key={d.id}>
            <Link to={`/disciplines/${d.id}`}>
              {d.name}
            </Link>
            {' '}– Semester {d.semester}, Credits {d.credits}
            {' '}
            <button onClick={() => onDelete(d.id)}>Delete</button>
            {' '}
            <Link to={`/disciplines/${d.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
