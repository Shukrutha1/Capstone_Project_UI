import React, { useEffect, useState } from 'react';
import ModuleHeader from '../components/ModuleHeader';
import { getMyEmployee } from '../services/employeeService';
import { createLeave, getLeavesByEmployee } from '../services/leaveService';

function EmployeeLeave() {
  const [employee, setEmployee] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ startDate: '', endDate: '', reason: '', leaveType: 'SICK' });
  const [error, setError] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setError(null);
    try {
      const emp = await getMyEmployee();
      setEmployee(emp);
      if (emp && (emp.id || emp.employeeId)) {
        const list = await getLeavesByEmployee(emp.id || emp.employeeId);
        setLeaves(list || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load leaves');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
  if (!employee || !(employee.id || employee.employeeId)) {
      setError('Employee not identified');
      return;
    }
    try {
  const dto = { employeeId: employee.id || employee.employeeId, startDate: form.endDate, endDate: form.endDate, reason: form.reason, leaveType: form.leaveType };
      await createLeave(dto);
      setForm({ startDate: '', endDate: '', reason: '' });
      await load();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Request failed');
    }
  };

  return (
    <div>
      <ModuleHeader title="Leave" />

      <div className="row">
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>Apply for Leave</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={submit}>
              <div className="mb-2">
                <label className="form-label">From</label>
                <input type="date" className="form-control" value={form.startDate ? form.startDate.split("T")[0] : ""} onChange={e => setForm(prev => ({ ...prev, startDate: e.target.value }))} />
              </div>
              <div className="mb-2">
                <label className="form-label">To</label>
                <input type="date" className="form-control" value={form.endDate ? form.startDate.split("T")[0] : ""} onChange={e => setForm(prev => ({ ...prev, endDate: e.target.value }))} />
              </div>
                <div className="mb-2">
                  <label className="form-label">Leave Type</label>
                  <select className="form-control" value={form.leaveType} onChange={e => setForm(prev => ({ ...prev, leaveType: e.target.value }))}>
                    <option value="SICK">Sick</option>
                    <option value="CASUAL">Casual</option>
                    <option value="PAID">Paid</option>
                    {/* <option value="TO_BE">To Be</option> */}
                  </select>
                </div>
              <div className="mb-2">
                <label className="form-label">Reason</label>
                <textarea className="form-control" value={form.reason} onChange={e => setForm(prev => ({ ...prev, reason: e.target.value }))} />
              </div>
              <div>
                <button className="btn btn-primary" type="submit">Request Leave</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>My Leaves</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((l,index) => (
                    <tr key={l.leaveId || l.index}>
                      <td>{l.leaveId}</td>
                      <td>{l.startDate ? l.startDate.split("T")[0] : ""}</td>
                      <td>{l.endDate ? l.endDate.split("T")[0] : ""}</td>
                      <td>{l.reason}</td>
                      <td>{l.status}</td>
                    </tr>
                  ))}
                  {leaves.length === 0 && (
                    <tr><td colSpan="5" className="text-center">No leaves found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLeave;
