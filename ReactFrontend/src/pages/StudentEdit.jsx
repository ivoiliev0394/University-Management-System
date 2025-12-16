import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById, updateStudent } from '../api/studentApi';
import { useAuth } from '../contexts/AuthContext';

export default function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');



 useEffect(() => {
    // ⬇️ ако твоят endpoint не иска token за GET by id, остави така
    getStudentById(id, token)
      .then(data => setForm(data))
      .catch(() => setError('Student not found'));
  }, [id, token]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ⬇️ PUT е защитен → пращаме token
      await updateStudent(id, form, token);
      navigate(`/students/${id}`);
    } catch (err) {
      setError(err.message || 'Error');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Student</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={onSubmit}>
        <input name="facultyNumber" value={form.facultyNumber || ''} onChange={onChange} /> <br />
        <input name="firstName" value={form.firstName || ''} onChange={onChange} /> <br />
        <input name="middleName" value={form.middleName || ''} onChange={onChange} /> <br />
        <input name="lastName" value={form.lastName || ''} onChange={onChange} /> <br />
        <input name="major" value={form.major || ''} onChange={onChange} /> <br />
        <input name="course" type="number" value={form.course ?? 1} onChange={onChange} /> <br />
        <input name="email" value={form.email || ''} onChange={onChange} /> <br />
        <input name="address" value={form.address || ''} onChange={onChange} /> <br />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
