import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent } from '../api/studentApi';
import { useAuth } from '../contexts/AuthContext';

export default function Students() {
 const { user, token } = useAuth();

  const role = user?.role;
  const isAdmin = user?.roles?.includes('Admin');
  const isEditor = user?.roles?.includes('Admin') || user?.roles?.includes('Teacher');


  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    getAllStudents(token)
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const onDelete = async (id) => {
    if (!confirm('Are you sure?')) return;

    try {
      await deleteStudent(id, token);
      setStudents(students.filter(s => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h1>Students</h1>

      {/* ✅ CREATE – само Admin */}
      {isAdmin && (
        <Link to="/students/create">+ Create Student</Link>
      )}

      <ol>
        {students.map(s => (
          <li key={s.id}>
            <Link to={`/students/${s.id}`}>
              {s.firstName} {s.lastName}
            </Link>
            {' '}– {s.major} (Course {s.course}){' '}

            {/* ✅ EDIT / DELETE – Admin + Teacher */}
            {isEditor && (
              <>
                <button onClick={() => onDelete(s.id)}>Delete</button>{' '}
                <Link to={`/students/${s.id}/edit`}>Edit</Link>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

