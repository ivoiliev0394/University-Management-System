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
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Teachers</h1>

        {/* ✅ CREATE – само Admin */}
        {isAdmin && (
          <Link to="/teachers/create" className="btn btn-success">
            + Create Teacher
          </Link>
        )}
      </div>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th style={{ width: '220px' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map(t => (
            <tr key={t.id}>
              <td>
                <Link to={`/teachers/${t.id}`}>
                  {t.name}
                </Link>
              </td>

              <td>{t.department}</td>

              <td>
                <Link
                  to={`/teachers/${t.id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  Details
                </Link>

                {isAdmin && (
                  <>
                    <Link
                      to={`/teachers/${t.id}/edit`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => onDelete(t.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
