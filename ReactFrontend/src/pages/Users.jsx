import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../api/profileApi';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="container">
      <h1 className="mb-3">Users</h1>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: '180px' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>

              <td>
                <span
                  className={`badge ${
                    u.role === 'Admin'
                      ? 'bg-danger'
                      : u.role === 'Teacher'
                      ? 'bg-primary'
                      : 'bg-secondary'
                  }`}
                >
                  {u.role}
                </span>
              </td>

              <td>
                <Link
                  to={`/profile/${u.id}`}
                  className="btn btn-info btn-sm"
                >
                  View Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
