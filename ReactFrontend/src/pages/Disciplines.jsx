import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllDisciplines, getDisciplinesByMyMajor, deleteDiscipline } from '../api/disciplineApi';
import { useAuth } from '../contexts/AuthContext';

export default function Disciplines() {
  const { user } = useAuth();

const isAdmin = user?.roles?.includes('Admin');
const isTeacher = user?.roles?.includes('Teacher');
const isStudent = user?.roles?.includes('Student');

  const teacherId = user?.teacherId;

  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const loadDisciplines = async () => {
    try {
      let data;

      if (isStudent) {
        data = await getDisciplinesByMyMajor(); // ✅ Student
      } else {
        data = await getAllDisciplines();       // ✅ Admin / Teacher
      }

      setDisciplines(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  loadDisciplines();
}, [isStudent]);


  const onDelete = async (id) => {
    if (!confirm('Delete discipline?')) return;
    await deleteDiscipline(id);
    setDisciplines(d => d.filter(x => x.id !== id));
  };

  if (loading) return <p>Loading disciplines...</p>;




  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Disciplines</h1>

        {/* ✅ CREATE –  Admin */}
        {isAdmin && (
          <Link to="/disciplines/create" className="btn btn-success">
            + Create Discipline
          </Link>
        )}
      </div>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Semester</th>
            <th>Credits</th>
            <th style={{ width: '260px' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {disciplines.map(d => {
            const canEdit =
              isAdmin ||
              (isTeacher && d.teacherId === teacherId);

            return (
              <tr key={d.id}>
                <td>
                  <Link to={`/disciplines/${d.id}`}>
                    {d.name}
                  </Link>
                </td>

                <td>{d.semester}</td>
                <td>{d.credits}</td>

               <td>
                  <Link
                    to={`/disciplines/${d.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Details
                  </Link>

                  {(isAdmin || isTeacher) && (
                    <>
                      {isAdmin && (
                        <Link
                          to={`/disciplines/${d.id}/edit`}
                          className="btn btn-warning btn-sm me-2"
                        >
                          Edit
                        </Link>
                      )}

                      {isAdmin && (
                        <button
                          onClick={() => onDelete(d.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
