import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDepartment, deleteDepartment } from '../services/departmentService';

function DepartmentDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dept, setDept] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDepartment(id);
        setDept(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load department');
      }
    };
    load();
  }, [id]);

  const confirmDelete = async () => {
    try {
      await deleteDepartment(id);
      navigate('/admin/departments');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!dept) return <div>Loading...</div>;

  return (
    <div>
      <h3>Delete Department</h3>
      <div className="card p-3 mb-3">
        <p>Are you sure you want to delete <strong>{dept.name}</strong> (ID: {dept.id})?</p>
      </div>
      <div className="d-flex">
        <button className="btn btn-danger me-2" onClick={confirmDelete}>Yes, delete</button>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/departments')}>Cancel</button>
      </div>
    </div>
  );
}

export default DepartmentDelete;
