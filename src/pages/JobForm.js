import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, updateJob, getJob } from '../services/jobService';
import ModuleHeader from '../components/ModuleHeader';

function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({ jobTitle: '', baseSalary: 0, active: true });
  const [error, setError] = useState(null);

  useEffect(() => { if (id && id !== 'new') load(); }, [id]);

  const load = async () => {
    setError(null);
    try {
      const data = await getJob(id);
      console.log(data)
      if (data) setJob({ jobTitle: data.jobTitle || data.jobTitle || '', baseSalary: data.baseSalary ?? data.salary ?? 0, active: data.active ?? true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load job');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      //const payload = { jobTitle: job.jobTitle, baseSalary: Number(job.baseSalary), active: job.active ?? true };
      if (id && id !== 'new') {
        await updateJob(id, job);
      } else {
        await createJob(job);
      }
      navigate('/admin/jobs');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Save failed');
    }
  };

  return (
    <div>
      <ModuleHeader title={id && id !== 'new' ? `Edit Job #${id}` : 'Create Job Role'} />
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit} className="card p-3">
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input className="form-control" value={job.jobTitle ?? ''} onChange={e => setJob(prev => ({ ...prev, jobTitle: e.target.value }))} />
        </div>

        <div className="mb-3">
          <label className="form-label">Base Salary</label>
          <input type="number" className="form-control" value={job.baseSalary ?? 0} onChange={e => setJob(prev => ({ ...prev, baseSalary: e.target.value }))} />
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="active" checked={job.active ?? true} onChange={e => setJob(prev => ({ ...prev, active: e.target.checked }))} />
          <label className="form-check-label" htmlFor="active">Active</label>
        </div>

        <div className="d-flex">
          <button className="btn btn-primary me-2" type="submit">Save</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin/jobs')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
