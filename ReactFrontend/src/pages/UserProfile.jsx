import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../api/profileApi';

import ProfileHeader from '../components/profile/ProfileHeader';
import StudentProfile from '../components/profile/StudentProfile';
import TeacherProfile from '../components/profile/TeacherProfile';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile(id)
      .then(data => setProfile(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found or access denied</p>;

  return (
    <div className="container">
      <h1 className="mb-3">User Profile</h1>

      {/* 🔙 Back button */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <ProfileHeader
        email={profile.email}
        role={profile.role}
      />

      {profile.student && <StudentProfile data={profile.student} />}
      {profile.teacher && <TeacherProfile data={profile.teacher} />}
    </div>
  );
}

