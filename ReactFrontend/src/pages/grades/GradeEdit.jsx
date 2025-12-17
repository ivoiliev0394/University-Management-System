import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGradeById, updateGrade } from '../../api/gradeApi';

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
          value: data.value,
          // ⬇️ HTML date input иска YYYY-MM-DD
          date: data.date
            ? data.date.substring(0, 10)
            : ''
        });
      })
      .catch(() => setError('Grade not found'));
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm(state => ({
      ...state,
      [name]:
        name === 'studentId' || name === 'disciplineId'
          ? Number(value)
          : name === 'value'
          ? Number(value)
          : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await updateGrade(id, {
        ...form,
        // ⬇️ back-end очаква DateTime
        date: new Date(form.date).toISOString()
      });

      navigate(`/grades/${id}`);
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1 className="mb-3">Edit Grade</h1>

       {/* 🔙 Back */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={onSubmit} className="col-md-6">

        <div className="mb-3">
          <label className="form-label">Student ID</label>
          <input
            type="number"
            name="studentId"
            className="form-control"
            value={form.studentId}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Discipline ID</label>
          <input
            type="number"
            name="disciplineId"
            className="form-control"
            value={form.disciplineId}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Grade</label>
          <input
            type="number"
            name="value"
            min="2"
            max="6"
            step="0.01"
            className="form-control"
            value={form.value}
            onChange={onChange}
            required
          />
        </div>

        <button className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

