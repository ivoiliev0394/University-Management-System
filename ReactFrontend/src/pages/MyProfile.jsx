import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';   // ⬅️ ТОВА ЛИПСВАШЕ
import { getMyProfile } from '../api/profileApi';

import ProfileHeader from '../components/profile/ProfileHeader';
import AdminProfile from '../components/profile/AdminProfile';
import StudentProfile from '../components/profile/StudentProfile';
import TeacherProfile from '../components/profile/TeacherProfile';

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Error loading profile</p>;

  return (
    <div>
      <h1>My Profile</h1>

      <ProfileHeader
        email={profile.email}
        role={profile.role}
      />

      {profile.admin && <AdminProfile data={profile.admin} />}

      {profile.admin && (
        <section>
          <h2>Administrator Panel</h2>

          <p>
            <strong>Status:</strong>{' '}
            {profile.admin.isDeactivated ? 'Deactivated' : 'Active'}
          </p>

          <h3>Management</h3>
          <ul>
            <li>
              <Link to="/students">Manage Students</Link>
            </li>
            <li>
              <Link to="/teachers">Manage Teachers</Link>
            </li>
          </ul>
        </section>
      )}

      {profile.student && <StudentProfile data={profile.student} />}
      {profile.teacher && <TeacherProfile data={profile.teacher} />}
    </div>
  );
}

