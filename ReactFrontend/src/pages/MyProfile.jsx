import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../api/profileApi';

import ProfileHeader from '../components/profile/ProfileHeader';
import AdminProfile from '../components/profile/AdminProfile';
import StudentProfile from '../components/profile/StudentProfile';
import TeacherProfile from '../components/profile/TeacherProfile';

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyProfile()
      .then(data => setProfile(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Error loading profile</p>;

  return (
    <div className="container">
      <h1 className="mb-3">My Profile</h1>

      <ProfileHeader
        email={profile.email}
        role={profile.role}
      />

      {/* 🔐 ADMIN */}
      {profile.admin && (
        <>
          <AdminProfile data={profile.admin} />

          <section className="mt-4">
            <h2>Administrator Panel</h2>

            <p>
              <strong>Status:</strong>{' '}
              {profile.admin.isDeactivated ? 'Deactivated' : 'Active'}
            </p>

            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/students')}
              >
                Manage Students
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate('/teachers')}
              >
                Manage Teachers
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate('/disciplines')}
              >
                Manage Disciplines
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate('/grades')}
              >
                Manage Grades
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => navigate('/users')}
              >
                Manage Users
              </button>
            </div>
          </section>
        </>
      )}

      {/* 🎓 STUDENT */}
      {profile.student && (
        <section className="mt-4">
          <StudentProfile data={profile.student} />
        </section>
      )}

      {/* 👨‍🏫 TEACHER */}
      {profile.teacher && (
        <section className="mt-4">
          <TeacherProfile data={profile.teacher} />
        </section>
      )}
    </div>
  );
}

