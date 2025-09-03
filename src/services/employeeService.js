import api from './api';
import { decodeToken } from './auth';

const BASE = '/api/v1/employees';

export async function listEmployees(params) {
  const res = await api.get(BASE, { params });
  return res.data;
}

export async function createEmployee(employee) {
  const res = await api.post(BASE, employee);
  return res.data;
}

export async function getEmployee(id) {
  const res = await api.get(`${BASE}/${id}`);
  return res.data;
}

export async function updateEmployee(id, employee) {
  const res = await api.put(`${BASE}/${id}`, employee);
  return res.data;
}

export async function deleteEmployee(id) {
  const res = await api.delete(`${BASE}/${id}`);
  return res.data;
}

// Try to fetch the current logged-in employee. First try a /me endpoint, then
// fall back to listing employees and matching by user id from the token.
export async function getMyEmployee() {
  try {
    const res = await api.get(`${BASE}/me`);
    return res.data;
  } catch (err) {
    // If /me isn't available, try to match by token user id
    if (err.response && err.response.status === 404) {
      try {
        const payload = decodeToken();
        const userId = payload?.sub || payload?.userId || payload?.id || payload?.username;
        if (!userId) throw err;
        const list = await listEmployees();
        return list.find(e => String(e.userId) === String(userId) || String(e.id) === String(userId)) || null;
      } catch (e2) {
        throw err;
      }
    }
    throw err;
  }
}
