import api from './api';

const BASE = '/api/v1/users';

export async function getCurrentUser() {
  const res = await api.get(`${BASE}/me`);
  return res.data;
}

export async function createUser(payload) {
  const res = await api.post(BASE, payload);
  return res.data;
}

export async function updateUserStatus(id, isActive) {
  const res = await api.patch(`${BASE}/${id}/status`, { isActive });
  return res.data;
}

export async function listUsers(params) {
  const res = await api.get(BASE, { params });
  return res.data;
}
