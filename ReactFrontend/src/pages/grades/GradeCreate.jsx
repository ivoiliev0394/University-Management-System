import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGrade } from '../../api/gradeApi';
import { getAllStudents } from '../../api/studentApi';
import { getAllDisciplines } from '../../api/disciplineApi';

export default function GradeCreate() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [disciplines, setDisciplines] = useState([]);

  const [form, setForm] = useState({
    studentId: '',
    disciplineId: '',
    value: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getAllStudents(), getAllDisciplines()])
      .then(([studentsData, disciplinesData]) => {
        setStudents(studentsData);
        setDisciplines(disciplinesData);
      })
      .catch(() => setError('Failed to load data'));
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createGrade({
        studentId: Number(form.studentId),
        disciplineId: Number(form.disciplineId),
        value: Number(form.value)
      });

      navigate('/grades');
    } catch (err) {
      setError(err.message || 'Create failed');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Add Grade</h1>

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
          <label className="form-label">Student</label>
          <select
            className="form-select"
            name="studentId"
            value={form.studentId}
            onChange={onChange}
            required
          >
            <option value="">-- Select student --</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Discipline</label>
          <select
            className="form-select"
            name="disciplineId"
            value={form.disciplineId}
            onChange={onChange}
            required
          >
            <option value="">-- Select discipline --</option>
            {disciplines.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Grade</label>
          <input
            type="number"
            min="2"
            max="6"
            step="0.01"
            className="form-control"
            name="value"
            value={form.value}
            onChange={onChange}
            required
          />
        </div>

        <button className="btn btn-success">Create</button>
      </form>
    </div>
  );
}
