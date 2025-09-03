import api from './api';

const BASE = '/api/departments';

export async function listDepartments(params) {
  const res = await api.get(BASE, { params });
  return res.data;
}

export async function createDepartment(dept) {
  const res = await api.post(BASE, dept);
  return res.data;
}

export async function updateDepartment(id, dept) {
  const res = await api.put(`${BASE}/${id}`, dept);
  return res.data;
}

export async function deleteDepartment(id) {
  const res = await api.delete(`${BASE}/${id}`);
  return res.data;
}

// helper: fetch all and find by id (backend has no GET /{id})
export async function getDepartment(id) {
  const data = await listDepartments();
  const list = data.content || data || [];
  return list.find(d => d.id === Number(id)) || null;
}
