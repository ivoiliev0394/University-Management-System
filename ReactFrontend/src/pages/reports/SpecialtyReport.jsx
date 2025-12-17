import { useState } from 'react';
import { getAverageBySpecialty } from '../../api/reportApi';
import { useNavigate } from 'react-router-dom';
export default function SpecialtyReport() {
  const [major, setMajor] = useState('');
  const [course, setCourse] = useState('');
  const [data, setData] = useState(null);
const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await getAverageBySpecialty(major, Number(course));
    setData(result);
  };

  return (
    <div className="container">
      <h2>Specialty Average Report</h2>
     
      <form onSubmit={onSubmit} className="mb-3">
        <input className="form-control mb-2" placeholder="Major"
          value={major} onChange={e => setMajor(e.target.value)} />

        <input className="form-control mb-2" placeholder="Course"
          value={course} onChange={e => setCourse(e.target.value)} />

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

      {data && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student</th>
              <th>Average Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map(s => (
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
