import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole, getToken } from '../services/auth';

function ProtectedRoute({ children, roleRequired }) {
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const role = getUserRole();
  // role could be string or array
  const normalized = Array.isArray(role) ? role[0] : role;
  if (roleRequired && !new RegExp(roleRequired, 'i').test(normalized || '')) {
    // unauthorized
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
