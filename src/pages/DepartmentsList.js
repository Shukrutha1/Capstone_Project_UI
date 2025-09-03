import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listDepartments, deleteDepartment } from '../services/departmentService';
import ModuleHeader from '../components/ModuleHeader';

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchDepartments(); }, []);

  const fetchDepartments = async () => {
    setError(null);
    try {
      const data = await listDepartments();
      setDepartments(data.content || data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load departments');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this department?')) return;
    try {
      await deleteDepartment(id);
      fetchDepartments();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    }
  };

  return (
    <div>
      <ModuleHeader title="Departments" />
      <div className="mb-3">
        <Link className="btn btn-primary" to="/admin/departments/new">Create Department</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {departments.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name || d.departmentName || ''}</td>
                <td>{d.description || ''}</td>
                <td>{(d.active === undefined ? d.isActive : d.active) ? <span className="badge bg-success">Active</span> : <span className="badge bg-secondary">Inactive</span>}</td>
                <td>
                  <Link className="btn btn-sm btn-outline-secondary me-2" to={`/admin/departments/${d.id}`}>View</Link>
                  <Link className="btn btn-sm btn-outline-primary me-2" to={`/admin/departments/${d.id}/edit`}>Edit</Link>
                  <Link className="btn btn-sm btn-outline-danger" to={`/admin/departments/${d.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
            {departments.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">No departments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DepartmentsList;
