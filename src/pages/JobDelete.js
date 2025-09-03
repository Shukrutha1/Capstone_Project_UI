import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getJob, deleteJob } from '../services/jobService';

function JobDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getJob(id);
        setJob(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load job');
      }
    };
    load();
  }, [id]);

  const confirm = async () => {
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
      <h3>Delete Job #{job.id}</h3>
      <div className="card p-3 mb-3">
        <p><strong>Title:</strong> {job.title || job.jobTitle}</p>
        <p><strong>Base Salary:</strong> {job.baseSalary}</p>
      </div>

      <div className="d-flex">
        <Link className="btn btn-secondary me-2" to="/admin/jobs">Cancel</Link>
        <button className="btn btn-danger" onClick={confirm}>Confirm Delete</button>
      </div>
    </div>
  );
}

export default JobDelete;
