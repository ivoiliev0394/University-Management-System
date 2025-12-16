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

    try {
      await updateTeacher(id, form);
      navigate('/teachers');
    } catch (err) {
      setError(err.message || 'Error');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Teacher</h1>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label><br />
          <input name="name" value={form.name} onChange={onChange} required />
        </div>

        <div>
          <label>Title</label><br />
          <input name="title" value={form.title} onChange={onChange} required />
        </div>

        <div>
          <label>Department</label><br />
          <input name="department" value={form.department} onChange={onChange} required />
        </div>

        <div>
          <label>Email</label><br />
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </div>

        <div>
          <label>Phone</label><br />
          <input name="phone" value={form.phone} onChange={onChange} required />
        </div>

        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
