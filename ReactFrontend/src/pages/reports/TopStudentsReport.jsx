import { useState } from 'react';
import { getTopStudentsByDiscipline } from '../../api/reportApi';
import { useNavigate } from 'react-router-dom';

export default function TopStudentsReport() {
  const [disciplineId, setDisciplineId] = useState('');
  const [students, setStudents] = useState([]);
const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await getTopStudentsByDiscipline(Number(disciplineId));
    setStudents(result);
  };

  return (
    <div className="container">
      <h2>Top Students by Discipline</h2>
        
      <form onSubmit={onSubmit} className="mb-3">
        <input className="form-control mb-2"
          placeholder="Discipline ID"
          value={disciplineId}
          onChange={e => setDisciplineId(e.target.value)} />

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

      {students.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.student}</td>
                <td>{s.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
