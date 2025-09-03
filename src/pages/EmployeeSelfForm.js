import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import ModuleHeader from '../components/ModuleHeader';
import { getMyEmployee, updateEmployee } from '../services/employeeService';

function EmployeeSelfForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({ id: '', firstName: '', lastName: '', dob: '', phone: '', address: '', designation: '', departmentId: '', jobId: '', salary: '', userId: '', email: '' });
  const [error, setError] = useState(null);

  useEffect(() => { load();}, []);

  const load = async () => {
    setError(null);
    try {
      const data = await getMyEmployee();
      console.log('loaded data: ', data);
      setEmployee({
        id: data.id,
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
      setError(err.response?.data?.message || err.message || 'Failed to load profile');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
    //   const empId = employee.id || employee.employeeId;
      
    //   if (!empId) {
    //     setError('Employee id not available. Cannot perform update.');
    //     return;
    //   }
    console.log('loaded employee: ', employee);
    const empId = employee.id || employee.employeeId;
      await updateEmployee(empId, employee);
      navigate('/employee');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Save failed');
    }
  };

  return (
    <div>
      <ModuleHeader title={`Edit Profile`} />
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
            <input className="form-control" value={employee.designation ?? ''}  />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">Department ID</label>
            <input className="form-control" value={employee.departmentId ?? ''} />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">Job ID</label>
            <input className="form-control" value={employee.jobId ?? ''}  />
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
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/employee')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeSelfForm;