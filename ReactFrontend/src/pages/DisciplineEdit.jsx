import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getDisciplineById,
  updateDiscipline
} from '../api/disciplineApi';
import { getAllTeachers } from '../api/teacherApi';

export default function DisciplineEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      getDisciplineById(id),
      getAllTeachers()
    ])
      .then(([disciplineData, teachersData]) => {
        setForm(disciplineData);
        setTeachers(teachersData);
      })
      .catch(() => setError('Failed to load data'));
  }, [id]);

  if (!form) return <p>Loading...</p>;

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === 'semester' || name === 'credits' || name === 'teacherId'
          ? Number(value)
          : value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await updateDiscipline(id, form);
      navigate(`/disciplines/${id}`);
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Edit Discipline</h1>

      {/* 🔙 Back */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={onSubmit} className="w-50">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Semester</label>
          <input
            className="form-control"
            type="number"
            name="semester"
            min="1"
            max="8"
            value={form.semester}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Credits</label>
          <input
            className="form-control"
            type="number"
            min="1"
            name="credits"
            value={form.credits}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teacher</label>
          <select
            className="form-select"
            name="teacherId"
            value={form.teacherId || ''}
            onChange={onChange}
            required
          >
            <option value="">-- Select teacher --</option>
            {teachers.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
