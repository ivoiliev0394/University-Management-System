import { useEffect, useState } from 'react';
import { getAllDisciplines } from '../api/disciplineApi';

export default function PublicDisciplines() {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDisciplines()
      .then(setDisciplines)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading disciplines...</p>;

  return (
    <div className="container">
      <h1 className="mb-4">University Disciplines</h1>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Semester</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {disciplines.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.semester}</td>
              <td>{d.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-muted mt-3">
        *This information is publicly available and does not require registration.
      </p>
    </div>
  );
}
