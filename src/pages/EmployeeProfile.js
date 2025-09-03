import React, { useEffect, useState } from 'react';
import ModuleHeader from '../components/ModuleHeader';
import { getMyEmployee, updateEmployee } from '../services/employeeService';

function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setError(null);
    try {
      const data = await getMyEmployee();
      setEmployee(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load profile');
    }
  };

  const handleSave = async () => {
    try {
      await updateEmployee(employee.id || employee.employeeId, employee);
      setEditing(false);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Save failed');
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <ModuleHeader title="My Profile" />
      <div className="card p-3 mb-3">
        <div className="mb-2"><strong>Name:</strong>{' '}
          {editing ? (
            <>
              <input className="form-control" value={employee.firstName || ''} onChange={e => setEmployee({...employee, firstName: e.target.value})} />
              <input className="form-control mt-2" value={employee.lastName || ''} onChange={e => setEmployee({...employee, lastName: e.target.value})} />
            </>
          ) : (
            (employee.firstName || employee.first || '') + ' ' + (employee.lastName || employee.last || '')
          )}
        </div>

        <div className="mb-2"><strong>Email:</strong> {editing ? <input className="form-control" value={employee.email || ''} onChange={e => setEmployee({...employee, email: e.target.value})} /> : employee.email}</div>
        <div className="mb-2"><strong>Phone:</strong> {editing ? <input className="form-control" value={employee.phone || ''} onChange={e => setEmployee({...employee, phone: e.target.value})} /> : employee.phone}</div>
        <div className="mb-2"><strong>Address:</strong> {editing ? <input className="form-control" value={employee.address || ''} onChange={e => setEmployee({...employee, address: e.target.value})} /> : employee.address}</div>

        <div className="d-flex mt-3">
          {editing ? (
            <>
              <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
