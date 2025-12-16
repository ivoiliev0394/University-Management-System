import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllGrades, deleteGrade } from '../api/gradeApi';
import { useAuth } from '../contexts/AuthContext';

export default function Grades() {
  const { user } = useAuth();

  // ✅ roles като масив
  const roles = user?.roles || [];
  const isAdmin = roles.includes('Admin');
  const isEditor = roles.includes('Admin') || roles.includes('Teacher');

  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const data = await getAllGrades();
      setGrades(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Are you sure?')) return;

    try {
      await deleteGrade(id);
      setGrades(grades.filter(g => g.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading grades...</p>;

  return (
    <div>
      <h1>Grades</h1>

      {/* ✅ CREATE – Admin + Teacher */}
      {isEditor && <Link to="/grades/create">+ Add Grade</Link>}

      <ol>
        {grades.map(g => (
          <li key={g.id}>
            <b>{g.studentName}</b> – {g.disciplineName} – 
            Grade: <b>{g.value}</b> ({new Date(g.date).toLocaleDateString()})

            {' '}
            <Link to={`/grades/${g.id}`}>Details</Link>

            {isEditor && (
              <>
                {' '}
                <Link to={`/grades/${g.id}/edit`}>Edit</Link>
                {' '}
                <button onClick={() => onDelete(g.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ol>

    </div>
  );
}
