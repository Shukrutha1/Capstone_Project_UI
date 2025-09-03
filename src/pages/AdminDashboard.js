import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Admin Dashboard</h2>
      </div>

      {/* Dashboard Grid */}
      <div className="row g-4">
        <div className="col-md-4">
          <Link to="/admin/employees" className="text-decoration-none">
            <div className="card shadow-sm h-100 border-0 hover-card">
              <div className="card-body text-center">
                <i className="bi bi-people fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-dark">Employee Management</h5>
                <p className="text-muted small">Add, update, delete and view employees</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/users" className="text-decoration-none">
            <div className="card shadow-sm h-100 border-0 hover-card">
              <div className="card-body text-center">
                <i className="bi bi-person-circle fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-dark">Users</h5>
                <p className="text-muted small">Manage application users</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/departments" className="text-decoration-none">
            <div className="card shadow-sm h-100 border-0 hover-card">
              <div className="card-body text-center">
                <i className="bi bi-building fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-dark">Departments</h5>
                <p className="text-muted small">Organize employees by department</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/jobs" className="text-decoration-none">
            <div className="card shadow-sm h-100 border-0 hover-card">
              <div className="card-body text-center">
                <i className="bi bi-briefcase fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-dark">Jobs</h5>
                <p className="text-muted small">Manage job roles and salaries</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/payroll" className="text-decoration-none">
            <div className="card shadow-sm h-100 border-0 hover-card">
              <div className="card-body text-center">
                <i className="bi bi-cash-stack fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-dark">Payroll Processing</h5>
                <p className="text-muted small">Generate and manage payrolls</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/leaves" className="text-decoration-none">
            <div className="card shadow-sm h-100 border-0 hover-card">
              <div className="card-body text-center">
                <i className="bi bi-calendar-check fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-dark">Leave Management</h5>
                <p className="text-muted small">Approve or reject leave requests</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
