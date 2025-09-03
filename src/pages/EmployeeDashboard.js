import React from 'react';
import { Link, Routes, Route, Outlet } from 'react-router-dom';
import EmployeeProfile from './EmployeeProfile';
import EmployeeSelfView from './EmployeeSelfView';
import EmployeeSelfForm from './EmployeeSelfForm';
import EmployeePayroll from './EmployeePayroll';
import EmployeeLeave from './EmployeeLeave';

function EmployeeDashboard() {
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Employee Dashboard</h2>
      </div>

      {/* Dashboard Grid */}
      <div className="row g-4">
        <div className="col-md-4">
          <Link to="profile" className="text-decoration-none">
            <div className="card shadow-sm h-100 border-0 hover-card">
              <div className="card-body text-center">
                <i className="bi bi-person-circle fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-dark">Profile</h5>
                <p className="text-muted small">View and update your personal details</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="payroll" className="text-decoration-none">
            <div className="card shadow-sm h-100 border-0 hover-card">
              <div className="card-body text-center">
                <i className="bi bi-cash-stack fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-dark">Salary Slip</h5>
                <p className="text-muted small">View your monthly salary details</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="leave" className="text-decoration-none">
            <div className="card shadow-sm h-100 border-0 hover-card">
              <div className="card-body text-center">
                <i className="bi bi-calendar-check fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-dark">Leave Request</h5>
                <p className="text-muted small">Apply for leave and check status</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Nested Routes */}
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<EmployeeSelfView />} />
          <Route path="profile" element={<EmployeeSelfView />} />
          <Route path="profile/edit" element={<EmployeeSelfForm />} />
          <Route path="payroll" element={<EmployeePayroll />} />
          <Route path="leave" element={<EmployeeLeave />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
