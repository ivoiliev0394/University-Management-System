import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeacher } from '../../api/teacherApi';

export default function TeacherCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    title: '',
    department: '',
    phone: ''
  });

  const [error, setError] = useState('');

  const onChange = (e) => {
    setForm(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createTeacher(form);
      navigate('/teachers');
    } catch (err) {
      setError(err.message || 'Create failed');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-3">Create Teacher</h1>

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
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={onChange}
            required
          />
        </div>

        <hr />

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            name="department"
            className="form-control"
            value={form.department}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Teacher
        </button>
      </form>
    </div>
  );
}

