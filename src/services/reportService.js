import api from './api';

const BASE = '/api/v1/reports';

export async function getPayrollSummary(year, month = 0) {
  const res = await api.get(`${BASE}/payroll-summary`, { params: { year, month } });
  return res.data;
}

export async function getDepartmentCost(departmentId, year, month = 0) {
  const res = await api.get(`${BASE}/department-cost`, { params: { departmentId, year, month } });
  return res.data;
}

export default {
  getPayrollSummary,
  getDepartmentCost
};