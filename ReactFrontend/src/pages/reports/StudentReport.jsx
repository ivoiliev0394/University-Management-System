import { useState } from 'react';
import { getStudentReport } from '../../api/reportApi';
import { useNavigate } from 'react-router-dom';
export default function StudentReport() {
  const [studentId, setStudentId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await getStudentReport(Number(studentId));
      setData(result);
      setError(null);
    } catch {
      setError('Student not found or unauthorized');
      setData(null);
    }
  };

  return (
    <div className="container">
      <h2>Student Academic Report</h2>
         
      <form onSubmit={onSubmit} className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Student ID"
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
        />
        <button className="btn btn-primary">Load</button>
        <> </>
         {/* 🔙 Back */}
              <button
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {data && (
        <>
          <div className="mb-3">
            <strong>Faculty Number:</strong> {data.facultyNumber}<br />
            <strong>Name:</strong> {data.fullName}<br />
            <strong>Major:</strong> {data.major}<br />
            <strong>Course:</strong> {data.course}
          </div>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Discipline</th>
                <th>Grade</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.grades.map((g, i) => (
                <tr key={i}>
                  <td>{g.discipline}</td>
                  <td>{g.value.toFixed(2)}</td>
                  <td>{new Date(g.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

