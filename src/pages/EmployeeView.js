import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEmployee, deleteEmployee } from '../services/employeeService';
import ModuleHeader from '../components/ModuleHeader';

function EmployeeView() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, [id]);

  const fetch = async () => {
    setError(null);
    try {
      const data = await getEmployee(id);
      setEmployee(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load employee');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      navigate('/admin/employees');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!employee) return <div>Loading...</div>;

  return (
    <div>
  <ModuleHeader title={`Employee #${employee.id || employee.employeeId}`} />
      <div className="card p-3 mb-3">
        <p><strong>Name:</strong> {(employee.firstName || employee.first || '') + ' ' + (employee.lastName || employee.last || '')}</p>
        <p><strong>DOB:</strong> {employee.dob || employee.dateOfBirth}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>Designation:</strong> {employee.designation}</p>
        <p><strong>Department ID:</strong> {employee.departmentId}</p>
        <p><strong>Job ID:</strong> {employee.jobId}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>User ID:</strong> {employee.userId}</p>
        <p><strong>Email:</strong> {employee.email}</p>
      </div>

      <div className="d-flex">
        <Link className="btn btn-secondary me-2" to="/admin/employees">Back</Link>
        <Link className="btn btn-primary me-2" to={`/admin/employees/${employee.id || employee.employeeId}/edit`}>Edit</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default EmployeeView;
