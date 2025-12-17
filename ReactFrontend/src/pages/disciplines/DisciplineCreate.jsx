import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDiscipline } from '../../api/disciplineApi';
import { getAllTeachers } from '../../api/teacherApi';

export default function DisciplineCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    semester: 1,
    credits: 1,
    teacherId: ''
  });

  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllTeachers()
      .then(setTeachers)
      .catch(() => setError('Failed to load teachers'));
  }, []);

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
      await createDiscipline(form);
      navigate('/disciplines');
    } catch (err) {
      setError(err.message || 'Create failed');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Create Discipline</h1>

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
            min="1"
            max="8"
            name="semester"
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
            value={form.teacherId}
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

        <button className="btn btn-success">Create</button>
      </form>
    </div>
  );
}
