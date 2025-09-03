import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDepartment, updateDepartment, getDepartment } from '../services/departmentService';
import ModuleHeader from '../components/ModuleHeader';

function DepartmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dept, setDept] = useState({ departmentName: '', description: '', active: true });
  const [error, setError] = useState(null);

  useEffect(() => {
  if (id && id !== 'new') load();
  }, [id]);

  const load = async () => {
    setError(null);
    try {
      const data = await getDepartment(id);
      if (data) setDept({ departmentName: data.departmentName || '', description: data.description || '', active: data.active ?? true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load department');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (id && id !== 'new') {
        await updateDepartment(id, dept);
      } else {
        await createDepartment(dept);
      }
      navigate('/admin/departments');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Save failed');
    }
  };

  return (
    <div>
      <ModuleHeader title={id && id !== 'new' ? `Edit Department #${id}` : 'Create Department'} />
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit} className="card p-3">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={dept.departmentName ?? ''} onChange={e => setDept(prev => ({ ...prev, departmentName: e.target.value }))} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={dept.description ?? ''} onChange={e => setDept(prev => ({ ...prev, description: e.target.value }))} />
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="active" checked={dept.active ?? true} onChange={e => setDept(prev => ({ ...prev, active: e.target.checked }))} />
          <label className="form-check-label" htmlFor="active">Active</label>
        </div>
        <div className="d-flex">
          <button className="btn btn-primary me-2" type="submit">Save</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin/departments')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DepartmentForm;
