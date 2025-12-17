import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../../api/studentApi';

export default function StudentCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    facultyNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    major: '',
    course: 1,
    address: ''
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
      await createStudent(form);
      navigate('/students');
    } catch (err) {
      setError(err.message || 'Create failed');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-3">Create Student</h1>

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
          <label className="form-label">Faculty Number</label>
          <input
            name="facultyNumber"
            className="form-control"
            value={form.facultyNumber}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            name="firstName"
            className="form-control"
            value={form.firstName}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Middle Name</label>
          <input
            name="middleName"
            className="form-control"
            value={form.middleName}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Major</label>
          <input
            name="major"
            className="form-control"
            value={form.major}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Course</label>
          <input
            type="number"
            name="course"
            min="1"
            max="6"
            className="form-control"
            value={form.course}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            name="address"
            className="form-control"
            value={form.address}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Student
        </button>
      </form>
    </div>
  );
}
