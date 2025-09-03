import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDepartment, deleteDepartment } from '../services/departmentService';
import ModuleHeader from '../components/ModuleHeader';

function DepartmentView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dept, setDept] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDepartment(id);
        if (!data) setError('Department not found');
        setDept(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load department');
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this department?')) return;
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
      <ModuleHeader title={`Department #${dept.id}`} />
      <div className="card p-3 mb-3">
        <p><strong>Name:</strong> {dept.name || dept.departmentName}</p>
        <p><strong>Description:</strong> {dept.description}</p>
        <p><strong>Active:</strong> {(dept.active === undefined ? dept.isActive : dept.active) ? 'Yes' : 'No'}</p>
      </div>

      <div className="d-flex">
        <Link className="btn btn-secondary me-2" to="/admin/departments">Back</Link>
        <Link className="btn btn-primary me-2" to={`/admin/departments/${dept.id}/edit`}>Edit</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default DepartmentView;
