import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeacherById } from '../api/teacherApi';

export default function TeacherDetails() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    getTeacherById(id).then(setTeacher);
  }, [id]);

  if (!teacher) return <p>Loading...</p>;

  return (
    <div>
      <h2>{teacher.name}</h2>
      <p><b>Title:</b> {teacher.title}</p>
      <p><b>Department:</b> {teacher.department}</p>
      <p><b>Email:</b> {teacher.email}</p>
      <p><b>Phone:</b> {teacher.phone}</p>

      <Link to="/teachers">⬅ Back</Link>
    </div>
  );
}
