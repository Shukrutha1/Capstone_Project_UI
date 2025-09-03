import React, { useEffect, useState } from 'react';
import ModuleHeader from '../components/ModuleHeader';
import { getAllLeaves, updateLeaveStatus } from '../services/leaveService';
import { useNavigate } from 'react-router-dom';

function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);

  const load = async () => {
    setError(null);
    try {
      const data = await getAllLeaves();
      setLeaves(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load leaves');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) navigate('/login');
    }
  };

  const changeStatus = async (id, status) => {
    setError(null);
    try {
      await updateLeaveStatus(id, status);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed');
    }
  };

  return (
    <div>
      <ModuleHeader title="Manage Leaves" />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive card p-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee ID</th>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(l => (
              <tr key={l.leaveId}>
                <td>{l.leaveId}</td>
                <td>{l.employeeId}</td>
                <td>{l.startDate ? l.startDate.split("T")[0] : ""}</td>
                <td>{l.endDate ? l.endDate.split("T")[0] : ""}</td>
                <td>{l.leaveType || l.type || ''}</td>
                <td>{l.reason}</td>
                <td>{l.status}</td>
                <td>
                  {l.status !== 'APPROVED' && <button className="btn btn-sm btn-success me-2" onClick={() => changeStatus(l.leaveId, 'approve')}>Approve</button>}
                  {l.status !== 'REJECTED' && <button className="btn btn-sm btn-danger" onClick={() => changeStatus(l.leaveId, 'reject')}>Reject</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLeaves;