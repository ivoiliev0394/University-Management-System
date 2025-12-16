import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGradeById, updateGrade } from '../api/gradeApi';

export default function GradeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getGradeById(id)
      .then(data => {
        setForm({
          studentId: data.studentId,
          disciplineId: data.disciplineId,
          value: data.value
        });
      })
      .catch(() => setError('Grade not found'));
  }, [id]);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await updateGrade(id, form);
      navigate(`/grades/${id}`);
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Grade</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={onSubmit}>
        <div>
          <label>Student ID</label><br />
          <input
            type="number"
            name="studentId"
            value={form.studentId}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label>Discipline ID</label><br />
          <input
            type="number"
            name="disciplineId"
            value={form.disciplineId}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label>Grade</label><br />
          <input
            type="number"
            name="value"
            min="2"
            max="6"
            step="0.01"
            value={form.value}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

