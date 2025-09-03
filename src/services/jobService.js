import api from './api';

const BASE = '/api/jobs';

export async function listJobs(params) {
  const res = await api.get(BASE, { params });
  return res.data;
}

export async function createJob(job) {
  const res = await api.post(BASE, job);
  return res.data;
}

export async function updateJob(id, job) {
  const res = await api.put(`${BASE}/${id}`, job);
  return res.data;
}

export async function deleteJob(id) {
  const res = await api.delete(`${BASE}/${id}`);
  return res.data;
}

// helper: backend exposes only GET /api/jobs (list). Fetch all and find by id.
export async function getJob(id) {
  const data = await listJobs();
  const list = data.content || data || [];
  return list.find(j => j.id === Number(id)) || null;
}
