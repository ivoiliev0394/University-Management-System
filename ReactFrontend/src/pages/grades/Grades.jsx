import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllGrades, deleteGrade } from '../../api/gradeApi';
import { useAuth } from '../../contexts/AuthContext';

export default function Grades() {
  const { user } = useAuth();

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
    if (!confirm('Delete grade?')) return;

    try {
      await deleteGrade(id);
      setGrades(g => g.filter(x => x.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading grades...</p>;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Grades</h1>

        {/* ✅ CREATE – Admin + Teacher */}
        {isEditor && (
          <Link to="/grades/create" className="btn btn-success">
            + Add Grade
          </Link>
        )}
      </div>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Student</th>
            <th>Discipline</th>
            <th>Grade</th>
            <th>Date</th>
            <th style={{ width: '240px' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {grades.map(g => (
            <tr key={g.id}>
              <td>{g.studentName}</td>
              <td>{g.disciplineName}</td>

              <td>
                <span
                  className={`badge ${
                    g.value >= 5
                      ? 'bg-success'
                      : g.value >= 3
                      ? 'bg-warning text-dark'
                      : 'bg-danger'
                  }`}
                >
                  {g.value}
                </span>
              </td>

              <td>{new Date(g.date).toLocaleDateString()}</td>

              <td>
                <Link
                  to={`/grades/${g.id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  Details
                </Link>

                {isEditor && (
                  <>
                    <Link
                      to={`/grades/${g.id}/edit`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => onDelete(g.id)}
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

