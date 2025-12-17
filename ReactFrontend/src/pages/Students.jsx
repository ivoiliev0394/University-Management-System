import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent } from '../api/studentApi';
import { useAuth } from '../contexts/AuthContext';

export default function Students() {
  const { user, token } = useAuth();

  const isAdmin = user?.roles?.includes('Admin');
  const isEditor =
    user?.roles?.includes('Admin') ||
    user?.roles?.includes('Teacher');

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

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Students</h1>

        {/* ✅ CREATE – само Admin */}
        {isAdmin && (
          <Link to="/students/create" className="btn btn-success">
            + Create Student
          </Link>
        )}
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Major</th>
            <th>Course</th>
            <th style={{ width: '220px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>
                <Link to={`/students/${s.id}`}>
                  {s.firstName} {s.lastName}
                </Link>
              </td>
              <td>{s.major}</td>
              <td>{s.course}</td>
              <td>
                <Link
                  to={`/students/${s.id}`}
                  className="btn btn-sm btn-info me-2"
                >
                  Details
                </Link>

                {isEditor && (
                  <>
                    <Link
                      to={`/students/${s.id}/edit`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(s.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {students.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
