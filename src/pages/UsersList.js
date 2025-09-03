import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModuleHeader from '../components/ModuleHeader';
import { listUsers } from '../services/userService';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const data = await listUsers();
        setUsers(Array.isArray(data) ? data : data?.results || []);
      } catch (err) {
        setError('Failed to fetch users');
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <ModuleHeader title="Users" />
      {/* <div className="mb-3">
        <Link className="btn btn-primary" to="/admin/users/new">Create User</Link>
      </div> */}
      {loading ? (
        <div className="alert alert-info">Loading users...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : users.length === 0 ? (
        <div className="alert alert-info">No users found.</div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersList;