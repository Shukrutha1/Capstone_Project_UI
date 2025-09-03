import api from './api';

const BASE = '/api/v1/payroll';

export async function createPayrollRun(year, month) {
  const res = await api.post(`${BASE}/${year}/${month}`);
  return res.data;
}

export async function processPayrollRun(id) {
  const res = await api.post(`${BASE}/runs/${id}/process`);
  return res.data;
}

export async function lockPayrollRun(id) {
  const res = await api.post(`${BASE}/runs/${id}/lock`);
  return res.data;
}

export async function getPayrollItems(id) {
  const res = await api.get(`${BASE}/runs/${id}/items`);
  return res.data;
}

export async function getMyNetPay(year, month) {
  const res = await api.get(`${BASE}/my/${year}/${month}`);
  return res.data;
}
