import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getDisciplineById,
  updateDiscipline
} from '../api/disciplineApi';

export default function DisciplineEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    getDisciplineById(id).then(setForm);
  }, [id]);

  if (!form) return <p>Loading...</p>;

  const onChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    await updateDiscipline(id, form);
    navigate(`/disciplines/${id}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Edit Discipline</h1>

      <input name="name" value={form.name} onChange={onChange} /><br /> <br />
      <input name="semester" type="number" value={form.semester} onChange={onChange} /><br /> <br />
      <input name="credits" type="number" value={form.credits} onChange={onChange} /><br /> <br />
      <input name="teacherId" value={form.teacherId || ''} onChange={onChange} /><br /> <br />

      <button>Save</button>
    </form>
  );
}
