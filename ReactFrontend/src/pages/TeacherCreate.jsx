import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeacher } from '../api/teacherApi';

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
    <div>
      <h1>Create Teacher</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={onSubmit}>
        <input name="email" placeholder="Email" onChange={onChange} required /> <br /> <br />
        <input name="password" type="password" placeholder="Password" onChange={onChange} required /><br /> <br />

        <input name="name" placeholder="Full Name" onChange={onChange} required /><br /> <br />
        <input name="title" placeholder="Title" onChange={onChange} /><br /> <br />
        <input name="department" placeholder="Department" onChange={onChange} /><br /> <br />
        <input name="phone" placeholder="Phone" onChange={onChange} /><br /> <br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

