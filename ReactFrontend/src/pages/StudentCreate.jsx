import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../api/studentApi';

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
    <div>
      <h1>Create Student</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={onSubmit}>
        <input name="email" placeholder="Email" onChange={onChange} required /> <br /> <br />
        <input name="password" type="password" placeholder="Password" onChange={onChange} required /> <br /> <br />

        <input name="facultyNumber" placeholder="Faculty Number" onChange={onChange} required /> <br /> <br />
        <input name="firstName" placeholder="First Name" onChange={onChange} required /> <br /> <br />
        <input name="middleName" placeholder="Middle Name" onChange={onChange} required /> <br /> <br />
        <input name="lastName" placeholder="Last Name" onChange={onChange} required /> <br /> <br />
        <input name="major" placeholder="Major" onChange={onChange} required /> <br /> <br />
        <input name="course" type="number" min="1" max="6" onChange={onChange} required /> <br /> <br />
        <input name="address" placeholder="Address" onChange={onChange} /> <br /> <br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

