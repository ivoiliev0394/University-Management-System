import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../api/profileApi';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.email} ({u.role})
            {' '}
            <Link to={`/profile/${u.id}`}>View profile</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
