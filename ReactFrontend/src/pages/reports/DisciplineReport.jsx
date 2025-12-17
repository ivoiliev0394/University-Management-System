import { useState } from 'react';
import { getDisciplineAverage } from '../../api/reportApi';
import { useNavigate } from 'react-router-dom';
export default function DisciplineReport() {
  const [disciplineId, setDisciplineId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await getDisciplineAverage(Number(disciplineId));
      setData(result);
      setError(null);
    } catch {
      setError('No data found');
      setData(null);
    }
  };

  return (
    <div className="container">
      <h2>Discipline Report</h2>
     
      <form onSubmit={onSubmit} className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Discipline ID"
          value={disciplineId}
          onChange={e => setDisciplineId(e.target.value)}
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
        <table className="table table-bordered w-50">
          <tbody>
            <tr>
              <th>Discipline</th>
              <td>{data.discipline}</td>
            </tr>
            <tr>
              <th>Average Grade</th>
              <td>{data.averageGrade.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
