import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../api/profileApi';

import ProfileHeader from '../components/profile/ProfileHeader';
import AdminProfile from '../components/profile/AdminProfile';
import StudentProfile from '../components/profile/StudentProfile';
import TeacherProfile from '../components/profile/TeacherProfile';

export default function UserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile(id)
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found or access denied</p>;

  return (
    <div>
      <h1>User Profile</h1>

      <ProfileHeader
        email={profile.email}
        role={profile.role}
      />

      {profile.student && <StudentProfile data={profile.student} />}
      {profile.teacher && <TeacherProfile data={profile.teacher} />}
      {profile.admin && <AdminProfile data={profile.admin} />}
    </div>
  );
}
