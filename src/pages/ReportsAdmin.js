import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleHeader from '../components/ModuleHeader';
import { getPayrollSummary, getDepartmentCost } from '../services/reportService';

function ReportsAdmin() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [deptId, setDeptId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePayrollSummary = async () => {
    setError(null);
    setResult(null);
    try {
      const res = await getPayrollSummary(Number(year), month ? Number(month) : 0);
      setResult(res);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch payroll summary');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate('/login');
      }
    }
  };

  const handleDepartmentCost = async () => {
    setError(null);
    setResult(null);
    try {
      const res = await getDepartmentCost(Number(deptId), Number(year), month ? Number(month) : 0);
      setResult(res);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch department cost');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate('/login');
      }
    }
  };

  return (
    <div>
      <ModuleHeader title="Reports" />

      <div className="card p-3 mb-3">
        {error && <div className="alert alert-danger">{error}</div>}

        <h5>Payroll Summary</h5>
        <div className="row g-2 align-items-center mb-2">
          <div className="col-auto"><input className="form-control" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} /></div>
          <div className="col-auto"><input className="form-control" placeholder="Month (optional)" value={month} onChange={e => setMonth(e.target.value)} /></div>
          <div className="col-auto"><button className="btn btn-primary" onClick={handlePayrollSummary}>Run</button></div>
        </div>

        <hr />

        <h5>Department Cost</h5>
        <div className="row g-2 align-items-center">
          <div className="col-auto"><input className="form-control" placeholder="Department ID" value={deptId} onChange={e => setDeptId(e.target.value)} /></div>
          <div className="col-auto"><input className="form-control" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} /></div>
          <div className="col-auto"><input className="form-control" placeholder="Month (optional)" value={month} onChange={e => setMonth(e.target.value)} /></div>
          <div className="col-auto"><button className="btn btn-primary" onClick={handleDepartmentCost}>Run</button></div>
        </div>
      </div>

      {result && Array.isArray(result) && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Payroll ID</th>
                <th>Employee</th>
                <th>Basic</th>
                <th>Deductions</th>
                <th>Bonus</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {result.map(r => (
                <tr key={r.payrollId || r.id}>
                  <td>{r.payrollId || r.id}</td>
                  <td>{r.employeeName || r.employee || r.userId}</td>
                  <td>{r.basicSalary}</td>
                  <td>{r.deductions}</td>
                  <td>{r.bonus}</td>
                  <td>{r.netSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default ReportsAdmin;