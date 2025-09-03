import api from './api';

const BASE = '/api/v1/leaves';

export async function createLeave(leaveDto) {
  const res = await api.post(BASE, leaveDto);
  return res.data;
}

export async function getAllLeaves() {
  const res = await api.get(BASE);
  return res.data;
}

export async function getLeavesByEmployee(employeeId) {
  const res = await api.get(`${BASE}/employee/${employeeId}`);
  return res.data;
}

export async function updateLeaveStatus(id, status) {
  const res = await api.put(`${BASE}/${id}/${status}`);
  return res.data;
}

export default {
  createLeave,
  getAllLeaves,
  getLeavesByEmployee,
  updateLeaveStatus
};