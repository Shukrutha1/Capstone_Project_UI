import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModuleHeader from '../components/ModuleHeader';
import { getMyEmployee } from '../services/employeeService';

function EmployeeSelfView() {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);

  const load = async () => {
    setError(null);
    try {
      const data = await getMyEmployee();
      setEmployee(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load profile');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate('/login');
      }
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <ModuleHeader title={`Profile`} />
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
        <button className="btn btn-secondary me-2" onClick={() => navigate('/employee')}>Back</button>
        <Link className="btn btn-primary me-2" to="/employee/profile/edit">Edit</Link>
      </div>
    </div>
  );
}

export default EmployeeSelfView;