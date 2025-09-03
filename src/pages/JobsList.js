import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listJobs, deleteJob } from '../services/jobService';
import ModuleHeader from '../components/ModuleHeader';

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    setError(null);
    try {
      const data = await listJobs();
      setJobs(data.content || data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load jobs');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job role?')) return;
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    }
  };

  return (
    <div>
      <ModuleHeader title="Job Roles" />
      <div className="mb-3">
        <Link className="btn btn-primary" to="/admin/jobs/new">Create Job Role</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Base Salary</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.id}>
                <td>{j.id}</td>
                <td>{j.title || j.jobTitle || ''}</td>
                <td>{j.baseSalary != null ? j.baseSalary : j.salary || ''}</td>
                <td>{(j.active === undefined ? j.isActive : j.active) ? <span className="badge bg-success">Active</span> : <span className="badge bg-secondary">Inactive</span>}</td>
                <td>
                  <Link className="btn btn-sm btn-outline-secondary me-2" to={`/admin/jobs/${j.id}`}>View</Link>
                  <Link className="btn btn-sm btn-outline-primary me-2" to={`/admin/jobs/${j.id}/edit`}>Edit</Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(j.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No job roles found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobsList;
