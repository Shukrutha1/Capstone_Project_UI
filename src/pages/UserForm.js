import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';
import ModuleHeader from '../components/ModuleHeader';

function UserForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Build create payload according to backend CreateUserRequest expectations
      const payload = {
        username,
        password,
        email,
        role
      };
      await createUser(payload);
      navigate('/admin/users');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Create user failed');
    }
  };

  return (
    <div>
      <ModuleHeader title="Create User" />
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit} className="card p-3">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="d-flex">
          <button className="btn btn-primary me-2" type="submit">Create</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin/users')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
