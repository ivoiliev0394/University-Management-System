import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTeachers, deleteTeacher } from '../api/teacherApi';
import { useAuth } from '../contexts/AuthContext';

export default function Teachers() {
  const { user } = useAuth();

  const isAdmin = user?.roles?.includes('Admin');

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTeachers()
      .then(data => {
        setTeachers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const onDelete = async (id) => {
    if (!confirm('Are you sure?')) return;

    await deleteTeacher(id);
    setTeachers(t => t.filter(x => x.id !== id));
  };

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div>
      <h1>Teachers</h1>

      {/* ✅ CREATE – само Admin */}
      {isAdmin && (
        <Link to="/teachers/create">+ Create Teacher</Link>
      )}

      <ol>
        {teachers.map(t => (
          
          <li key={t.id}>
            
            <Link to={`/teachers/${t.id}`}>
              {t.name}
            </Link> – {t.department}

            {/* ❗ Edit/Delete – САМО Admin */}
            {isAdmin && (
              <>
                {' '}
                <button onClick={() => onDelete(t.id)}>Delete</button>
                {' '}
                <Link to={`/teachers/${t.id}/edit`}>Edit</Link>
              </>
            )}
          </li>
        ))}
      </ol>
      
    </div>
  );
}
