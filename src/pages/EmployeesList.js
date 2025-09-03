import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listEmployees, deleteEmployee } from '../services/employeeService';
import ModuleHeader from '../components/ModuleHeader';

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setError(null);
    try {
      const data = await listEmployees({});
      // Expecting data.content if pageable; fall back to array
      setEmployees(data.content || data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load employees');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        // token expired or unauthorized — redirect handled by api interceptor, but ensure navigation
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    }
  };

  return (
    <div>
      <ModuleHeader title="Employees" />
      <div className="mb-3">
        <Link className="btn btn-primary" to="/admin/employees/new">Create Employee</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Designation</th>
              <th>Department ID</th>
              <th>Job ID</th>
              <th>Salary</th>
              <th>User ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => {
              const id = e.id || e.employeeId || e.userId || e.id;
              const firstName = e.firstName || e.first_name || e.first || '';
              const lastName = e.lastName || e.last_name || e.last || '';
              const name = `${firstName} ${lastName}`.trim() || e.name || '';
              const dob = e.dob || e.dateOfBirth || e.birthDate || '';
              const phone = e.phone || e.mobile || '';
              const address = e.address || '';
              const designation = e.designation || e.job || e.title || '';
              const departmentId = e.departmentId || e.department || '';
              const jobId = e.jobId || '';
              const salary = e.salary != null ? e.salary : e.pay || '';
              const userId = e.userId || e.user_id || '';

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{dob}</td>
                  <td>{phone}</td>
                  <td>{address}</td>
                  <td>{designation}</td>
                  <td>{departmentId}</td>
                  <td>{jobId}</td>
                  <td>{salary}</td>
                  <td>{userId}</td>
                  <td>
                    <Link className="btn btn-sm btn-outline-secondary me-2" to={`/admin/employees/${id}`}>View</Link>
                    <Link className="btn btn-sm btn-outline-primary me-2" to={`/admin/employees/${id}/edit`}>Edit</Link>
                    <Link className="btn btn-sm btn-outline-danger" to={`/admin/employees/${id}/delete`}>Delete</Link>
                  </td>
                </tr>
              );
            })}
            {employees.length === 0 && (
              <tr>
                <td colSpan="11" className="text-center">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesList;
