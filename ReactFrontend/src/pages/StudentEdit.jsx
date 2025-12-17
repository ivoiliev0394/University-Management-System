import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById, updateStudent } from '../api/studentApi';
import { useAuth } from '../contexts/AuthContext';

export default function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getStudentById(id, token)
      .then(data => setForm(data))
      .catch(() => setError('Student not found'));
  }, [id, token]);

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
      await updateStudent(id, form, token);
      navigate(`/students/${id}`);
    } catch (err) {
      setError(err.message || 'Error while saving');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1 className="mb-3">Edit Student</h1>

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
          <label className="form-label">Faculty Number</label>
          <input
            name="facultyNumber"
            className="form-control"
            value={form.facultyNumber || ''}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            name="firstName"
            className="form-control"
            value={form.firstName || ''}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Middle Name</label>
          <input
            name="middleName"
            className="form-control"
            value={form.middleName || ''}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            className="form-control"
            value={form.lastName || ''}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Major</label>
          <input
            name="major"
            className="form-control"
            value={form.major || ''}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Course</label>
          <input
            type="number"
            name="course"
            className="form-control"
            min="1"
            max="6"
            value={form.course ?? 1}
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
          <label className="form-label">Address</label>
          <input
            name="address"
            className="form-control"
            value={form.address || ''}
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
