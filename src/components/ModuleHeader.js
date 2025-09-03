import React from 'react';
import { useNavigate } from 'react-router-dom';

function ModuleHeader({ title }) {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h3>{title}</h3>
      <div>
        <button className="btn btn-outline-primary" onClick={() => navigate('/admin')}>Home</button>
      </div>
    </div>
  );
}

export default ModuleHeader;
