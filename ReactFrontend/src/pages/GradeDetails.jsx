import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGradeById } from '../api/gradeApi';

export default function GradeDetails() {
  const { id } = useParams();
  const [grade, setGrade] = useState(null);

  useEffect(() => {
    getGradeById(id).then(setGrade);
  }, [id]);

  if (!grade) return <p>Loading...</p>;

  return (
    <div>
      <h1>Grade Details</h1>

      <p><b>ID:</b> {grade.id}</p>
      <p><b>Student:</b> {grade.studentName}  ({grade.studentId})</p>
      <p><b>Discipline:</b> {grade.disciplineName}  ({grade.disciplineId})</p>
      <p><b>Grade:</b> {grade.value}</p>
      <p><b>Date:</b> {new Date(grade.date).toLocaleDateString()}</p>

      <Link to="/grades">Back</Link>
    </div>
  );
}

