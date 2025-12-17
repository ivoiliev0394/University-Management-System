import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherById, updateTeacher } from '../api/teacherApi';

export default function TeacherEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getTeacherById(id)
      .then(data => setForm(data))
      .catch(() => setError('Teacher not found'));
  }, [id]);

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
      await updateTeacher(id, form);
      navigate('/teachers');
    } catch (err) {
      setError(err.message || 'Error while saving');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1 className="mb-3">Edit Teacher</h1>

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
          <label className="form-label">Name</label>
          <input
            name="name"
            className="form-control"
            value={form.name || ''}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={form.title || ''}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            name="department"
            className="form-control"
            value={form.department || ''}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email || ''}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            name="phone"
            className="form-control"
            value={form.phone || ''}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}
