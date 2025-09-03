import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../services/employeeService';
import ModuleHeader from '../components/ModuleHeader';

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({ firstName: '', lastName: '', dob: '', phone: '', address: '', designation: '', departmentId: '', jobId: '', salary: '', userId: '', email: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && id !== 'new') load();
  }, [id]);

  const load = async () => {
    setError(null);
    try {
      const data = await getEmployee(id);
      setEmployee({
        firstName: data.firstName || data.first || '',
        lastName: data.lastName || data.last || '',
        dob: data.dob || data.dateOfBirth || '',
        phone: data.phone || data.mobile || '',
        address: data.address || '',
        designation: data.designation || data.job || '',
        departmentId: data.departmentId || data.department || '',
        jobId: data.jobId || '',
        salary: data.salary || data.pay || '',
        userId: data.userId || data.user_id || '',
        email: data.email || ''
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load employee');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (id && id !== 'new') {
        await updateEmployee(id, employee);
      } else {
        await createEmployee(employee);
      }
      navigate('/admin/employees');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Save failed');
    }
  };

  return (
    <div>
  <ModuleHeader title={id && id !== 'new' ? `Edit Employee #${id}` : 'Create Employee'} />
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit} className="card p-3">
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">First Name</label>
            <input className="form-control" value={employee.firstName ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, firstName: e.target.value }))} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Last Name</label>
            <input className="form-control" value={employee.lastName ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, lastName: e.target.value }))} />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-4">
            <label className="form-label">DOB</label>
            <input type="date" className="form-control" value={employee.dob ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, dob: e.target.value }))} />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">Phone</label>
            <input className="form-control" value={employee.phone ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, phone: e.target.value }))} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input className="form-control" value={employee.address ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, address: e.target.value }))} />
        </div>

        <div className="row">
          <div className="mb-3 col-md-4">
            <label className="form-label">Designation</label>
            <input className="form-control" value={employee.designation ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, designation: e.target.value }))} />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">Department ID</label>
            <input className="form-control" value={employee.departmentId ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, departmentId: e.target.value }))} />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">Job ID</label>
            <input className="form-control" value={employee.jobId ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, jobId: e.target.value }))} />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-4">
            <label className="form-label">Salary</label>
            <input type="number" className="form-control" value={employee.salary ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, salary: e.target.value }))} />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">User ID</label>
            <input className="form-control" value={employee.userId ?? ''} onChange={(e) => setEmployee(prev => ({ ...prev, userId: e.target.value }))} />
          </div>
        </div>
        <div className="d-flex">
          <button className="btn btn-primary me-2" type="submit">Save</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin/employees')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
