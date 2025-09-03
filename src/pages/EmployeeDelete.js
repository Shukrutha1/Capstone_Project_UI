import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployee, deleteEmployee } from '../services/employeeService';

function EmployeeDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEmployee(id);
        setEmployee(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load employee');
      }
    };
    load();
  }, [id]);

  const confirmDelete = async () => {
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
      <h3>Delete Employee</h3>
      <div className="card p-3 mb-3">
        <p>Are you sure you want to delete <strong>{(employee.firstName || employee.first || '') + ' ' + (employee.lastName || employee.last || '')}</strong> (ID: {employee.id || employee.employeeId})?</p>
      </div>
      <div className="d-flex">
        <button className="btn btn-danger me-2" onClick={confirmDelete}>Yes, delete</button>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/employees')}>Cancel</button>
      </div>
    </div>
  );
}

export default EmployeeDelete;
