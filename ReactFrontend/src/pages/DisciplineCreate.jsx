import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDiscipline } from '../api/disciplineApi';

export default function DisciplineCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    semester: 1,
    credits: 0,
    teacherId: ''
  });

  const onChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const onSubmit = async (e) => {
  e.preventDefault();

  try {
    await createDiscipline(form);
    navigate('/disciplines');
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <form onSubmit={onSubmit}>
      <h1>Create Discipline</h1>

      <input name="name" placeholder="Name" onChange={onChange} /> <br /> <br />
      <input name="semester" placeholder="Semester" type="number" onChange={onChange} /><br /> <br />
      <input name="credits" placeholder="Credits" type="number" onChange={onChange} /><br /> <br />
      <input name="teacherId" placeholder="Teacher ID" onChange={onChange} /><br /> <br />

      <button>Create</button>
    </form>
  );
}
