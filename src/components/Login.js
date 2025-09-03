import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setToken, decodeToken } from '../services/auth';
import { createUser } from '../services/userService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('EMPLOYEE');
  const [regEmail, setRegEmail] = useState('');
  const [regSuccess, setRegSuccess] = useState(null);
  const [regErrors, setRegErrors] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    let errors = {};
    if (!regUsername.trim()) errors.username = 'Username is required.';
    if (!regPassword.trim()) errors.password = 'Password is required.';
    setRegErrors(errors);
    try {
      // Call the provided backend login endpoint
      const res = await api.post('/api/v1/auth/login', { username, password });
      // Support common token field names
      const token = res.data?.token || res.data?.accessToken || res.data?.jwt;
      if (!token) {
        setError('Login succeeded but no token was returned');
        return;
      }
      // Store token explicitly in sessionStorage (per request)
      setToken(token, false);

      const payload = decodeToken();
      const role = (payload && (payload.role || payload.roles)) || null;
      const finalRole = Array.isArray(role) ? role[0] : role;
      if (/ADMIN/i.test(finalRole)) {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegSuccess(null);
    setError(null);
    let errors = {};
    if (!regUsername.trim()) errors.username = 'Username is required.';
    if (!regEmail.trim()) errors.email = 'Email is required.';
    if (!regPassword.trim()) errors.password = 'Password is required.';
    if (!regRole.trim()) errors.role = 'Role is required.';
    setRegErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      await createUser({ username: regUsername, password: regPassword, role: regRole, email: regEmail });
      setRegSuccess('Registration successful! You can now login.');
      setShowRegister(false);
      setRegUsername('');
      setRegPassword('');
      setRegRole('EMPLOYEE');
      setRegEmail('');
      setRegErrors({});
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h3 className="mb-3">{showRegister ? 'Register' : 'Login'}</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {regSuccess && <div className="alert alert-success">{regSuccess}</div>}
          {showRegister ? (
            <form onSubmit={handleRegister} noValidate>
                <div className="mb-3">
                  <label className="form-label">Username </label>
                  <input className="form-control" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required />
                  {regErrors.username && <div className="text-danger small" >{regErrors.username}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required/>
                  {regErrors.password && <div className="text-danger small" >{regErrors.password}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required/>
                  {regErrors.email && <div className="text-danger small" >{regErrors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select className="form-control" value={regRole} onChange={(e) => setRegRole(e.target.value)} required>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  {regErrors.role && <div className="text-danger small" >{regErrors.role}</div>}
                </div>
                <button className="btn btn-success" type="submit">Register</button>
                <button className="btn btn-link ms-2" type="button" onClick={() => setShowRegister(false)}>Back to Login</button>
              </form>
          ) : (
            <>
              <form onSubmit={submit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  {regErrors.username && <div className="text-danger small" >{regErrors.username}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  {regErrors.password && <div className="text-danger small" >{regErrors.password}</div>}
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
              </form>
              <div className="mt-3 text-center">
                <button className="btn btn-link" onClick={() => setShowRegister(true)}>Register</button>
              </div>
            </>
          )}


        </div>
      </div>
    </div>
  );
}

export default Login;