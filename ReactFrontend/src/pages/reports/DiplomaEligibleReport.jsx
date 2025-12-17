import { useState } from 'react';
import { getDiplomaEligibleStudents } from '../../api/reportApi';
import { useNavigate } from 'react-router-dom';

export default function DiplomaEligibleReport() {
  const [major, setMajor] = useState('');
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await getDiplomaEligibleStudents(major);
    setStudents(result);
  };

  return (
    <div className="container">
      <h2>Diploma Eligible Students</h2>
       
      <form onSubmit={onSubmit} className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Major"
          value={major}
          onChange={e => setMajor(e.target.value)}
        />
        <button className="btn btn-success">Load</button>
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student</th>
              <th>Average Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.studentId}>
                <td>{s.student}</td>
                <td>{s.average.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
