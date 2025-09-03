import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole, logout, getToken } from '../services/auth';

function RoleNav() {
  const token = getToken();
  const role = getUserRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const normalized = Array.isArray(role) ? role[0] : role;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Payroll Management System</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && /ADMIN/i.test(normalized || '') && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
              </>
            )}

            {token && /EMPLOYEE/i.test(normalized || '') && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/employee">Employee</Link></li>
              </>
            )}
          </ul>

          <div className="d-flex">
            {!token ? (
              <Link className="btn btn-outline-primary" to="/login">Login</Link>
            ) : (
              <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default RoleNav;
