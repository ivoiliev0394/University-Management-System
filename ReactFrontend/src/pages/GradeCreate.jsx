import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGrade } from '../api/gradeApi';

export default function GradeCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    studentId: '',
    disciplineId: '',
    value: '',
  });

  const onChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    await createGrade(form);
    navigate('/grades');
  };

  return (
    <div>
      <h1>Add Grade</h1>

      <form onSubmit={onSubmit}>
        <input name="studentId" placeholder="Student ID" onChange={onChange} />
        <input name="disciplineId" placeholder="Discipline ID" onChange={onChange} />
        <input name="value" placeholder="Grade" onChange={onChange} />
        <button>Create</button>
      </form>
    </div>
  );
}
