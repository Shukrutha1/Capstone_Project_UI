import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getJob, deleteJob } from '../services/jobService';
import ModuleHeader from '../components/ModuleHeader';

function JobView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getJob(id);
        if (!data) setError('Job not found');
        setJob(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load job');
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this job role?')) return;
    try {
      await deleteJob(id);
      navigate('/admin/jobs');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <ModuleHeader title={`Job #${job.id}`} />
      <div className="card p-3 mb-3">
        <p><strong>Title:</strong> {job.title || job.jobTitle}</p>
        <p><strong>Base Salary:</strong> {job.baseSalary != null ? job.baseSalary : job.salary}</p>
        <p><strong>Active:</strong> {(job.active === undefined ? job.isActive : job.active) ? 'Yes' : 'No'}</p>
      </div>

      <div className="d-flex">
        <Link className="btn btn-secondary me-2" to="/admin/jobs">Back</Link>
        <Link className="btn btn-primary me-2" to={`/admin/jobs/${job.id}/edit`}>Edit</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default JobView;
