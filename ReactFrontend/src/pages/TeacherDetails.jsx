import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeacherById } from '../api/teacherApi';

export default function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeacherById(id)
      .then(data => setTeacher(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!teacher) return <p>Teacher not found</p>;

  return (
    <div className="container">
      <h1 className="mb-3">Teacher Details</h1>

      {/* 🔙 Back */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card col-md-6">
        <div className="card-body">
          <h4 className="card-title">{teacher.name}</h4>

          <p className="card-text">
            <strong>Title:</strong> {teacher.title}
          </p>

          <p className="card-text">
            <strong>Department:</strong> {teacher.department}
          </p>

          <p className="card-text">
            <strong>Email:</strong> {teacher.email}
          </p>

          <p className="card-text">
            <strong>Phone:</strong> {teacher.phone}
          </p>
        </div>
      </div>
    </div>
  );
}

