import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    studentEmail: '',     // 🔥 ВАЖНО
    facultyNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    major: '',
    course: 1,
    address: '',
    role: 'Student'       // 🔒 фиксирано
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        email: form.email,
        password: form.password,
        studentEmail: form.studentEmail || form.email, // ✅ ключов ред
        facultyNumber: form.facultyNumber,
        firstName: form.firstName,
        middleName: form.middleName,
        lastName: form.lastName,
        major: form.major,
        course: Number(form.course),
        address: form.address,
        role: 'Student'
      };

      const res = await fetch('https://localhost:7266/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Registration failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container col-md-6">
      <h1 className="mb-3">Register (Student)</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={onSubmit}>
        <input className="form-control mb-2" name="email" placeholder="Account Email" onChange={onChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={onChange} required />

        <input className="form-control mb-2" name="studentEmail" placeholder="Student Email" onChange={onChange} />
        <input className="form-control mb-2" name="facultyNumber" placeholder="Faculty Number" onChange={onChange} required />
        <input className="form-control mb-2" name="firstName" placeholder="First Name" onChange={onChange} required />
        <input className="form-control mb-2" name="middleName" placeholder="Middle Name" onChange={onChange} />
        <input className="form-control mb-2" name="lastName" placeholder="Last Name" onChange={onChange} required />
        <input className="form-control mb-2" name="major" placeholder="Major" onChange={onChange} required />
        <input className="form-control mb-2" type="number" min="1" max="6" name="course" onChange={onChange} required />
        <input className="form-control mb-3" name="address" placeholder="Address" onChange={onChange} />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
