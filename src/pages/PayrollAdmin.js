import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPayrollRun, processPayrollRun, lockPayrollRun, getPayrollItems, getMyNetPay } from '../services/payrollService';
import { getPayrollSummary, getDepartmentCost } from '../services/reportService';
import ModuleHeader from '../components/ModuleHeader';

function PayrollAdmin() {
  const navigate = useNavigate();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [runId, setRunId] = useState('');
  const [action, setAction] = useState(null); // which action form to show
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAuthError = (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      navigate('/login');
      return true;
    }
    return false;
  };

  const genPeriod = async () => {
    setError(null); setResult(null);
    try {
      const data = await createPayrollRun(Number(year), Number(month));
      setResult(data);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(err.response?.data?.message || err.message || 'Generate failed');
    }
  };

  const genSpecific = async () => {
    setError(null); setResult(null);
    try {
      const data = await processPayrollRun(runId);
      setResult(data);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(err.response?.data?.message || err.message || 'Process failed');
    }
  };

  const lockRun = async () => {
    setError(null); setResult(null);
    try {
      await lockPayrollRun(runId);
      setResult({ message: 'Locked successfully' });
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(err.response?.data?.message || err.message || 'Lock failed');
    }
  };

  const fetchItems = async () => {
    setError(null); setResult(null);
    try {
      const data = await getPayrollItems(runId);
      setResult(data);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(err.response?.data?.message || err.message || 'Fetch failed');
    }
  };

  const fetchPeriod = async () => {
    setError(null); setResult(null);
    try {
      const data = await getMyNetPay(Number(year), Number(month));
      setResult(data);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(err.response?.data?.message || err.message || 'Fetch failed');
    }
  };

  // Reports: payroll summary for period
  const runPayrollReport = async () => {
    setError(null); setResult(null);
    try {
      const data = await getPayrollSummary(Number(year), Number(month));
      setResult(data);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(err.response?.data?.message || err.message || 'Report failed');
    }
  };

  // Reports: department cost
  const runDepartmentReport = async () => {
    setError(null); setResult(null);
    try {
      const data = await getDepartmentCost(Number(runId), Number(year), Number(month));
      setResult(data);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(err.response?.data?.message || err.message || 'Report failed');
    }
  };

  return (
    <div>
      <ModuleHeader title="Payroll Management" />

      <div className="card p-3 mb-3">
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-primary" onClick={() => { setAction('genPeriod'); setResult(null); setError(null); }} style={{ backgroundColor: '#0d6efd' }}>Generate payroll for a period</button>
          <button className="btn btn-primary" onClick={() => { setAction('genSpecific'); setResult(null); setError(null); }} style={{ backgroundColor: '#0d6efd' }}>Generate a specific payroll</button>
          <button className="btn btn-primary" onClick={() => { setAction('lock'); setResult(null); setError(null); }} style={{ backgroundColor: '#0d6efd' }}>Lock a payroll</button>
          <button className="btn btn-primary" onClick={() => { setAction('fetchItems'); setResult(null); setError(null); }} style={{ backgroundColor: '#0d6efd' }}>Fetch a specific payroll Item</button>
          {/* <button className="btn btn-primary" onClick={() => { setAction('fetchPeriod'); setResult(null); setError(null); }} style={{ backgroundColor: '#0d6efd' }}>Fetch payroll for a period</button> */}
          <button className="btn btn-info" onClick={() => { setAction('reports'); setResult(null); setError(null); }} style={{ backgroundColor: '#0d6efd', color: 'white' }}>Summary Reports</button>
        </div>

        {/* action-specific small form */}
        <div className="mt-3">
          {action === 'genPeriod' && (
            <div>
              <div className="mb-2">
                <label className="form-label">Year</label>
                <input className="form-control" type="number" value={year} onChange={e => setYear(e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label">Month</label>
                <input className="form-control" type="number" value={month} onChange={e => setMonth(e.target.value)} />
              </div>
              <div>
                <button className="btn btn-success" onClick={genPeriod}>Submit</button>
                <button className="btn btn-secondary ms-2" onClick={() => setAction(null)}>Cancel</button>
              </div>
            </div>
          )}

          {action === 'genSpecific' && (
            <div>
              <div className="mb-2">
                <label className="form-label">Payroll Run ID</label>
                <input className="form-control" value={runId} onChange={e => setRunId(e.target.value)} />
              </div>
              <div>
                <button className="btn btn-success" onClick={genSpecific}>Submit</button>
                <button className="btn btn-secondary ms-2" onClick={() => setAction(null)}>Cancel</button>
              </div>
            </div>
          )}

          {action === 'lock' && (
            <div>
              <div className="mb-2">
                <label className="form-label">Payroll Run ID</label>
                <input className="form-control" value={runId} onChange={e => setRunId(e.target.value)} />
              </div>
              <div>
                <button className="btn btn-success" onClick={lockRun}>Submit</button>
                <button className="btn btn-secondary ms-2" onClick={() => setAction(null)}>Cancel</button>
              </div>
            </div>
          )}

          {action === 'fetchItems' && (
            <div>
              <div className="mb-2">
                <label className="form-label">Payroll Run ID</label>
                <input className="form-control" value={runId} onChange={e => setRunId(e.target.value)} />
              </div>
              <div>
                <button className="btn btn-success" onClick={fetchItems}>Submit</button>
                <button className="btn btn-secondary ms-2" onClick={() => setAction(null)}>Cancel</button>
              </div>
            </div>
          )}

          {action === 'fetchPeriod' && (
            <div>
              <div className="mb-2">
                <label className="form-label">Year</label>
                <input className="form-control" type="number" value={year} onChange={e => setYear(e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label">Month</label>
                <input className="form-control" type="number" value={month} onChange={e => setMonth(e.target.value)} />
              </div>
              <div>
                <button className="btn btn-success" onClick={fetchPeriod}>Submit</button>
                <button className="btn btn-secondary ms-2" onClick={() => setAction(null)}>Cancel</button>
              </div>
            </div>
          )}
       

          {action === 'reportPeriod' && (
            <div>
              <div className="mb-2">
                <label className="form-label">Year</label>
                <input className="form-control" type="number" value={year} onChange={e => setYear(e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label">Month (optional)</label>
                <input className="form-control" type="number" value={month} onChange={e => setMonth(e.target.value)} />
              </div>
              <div>
                <button className="btn btn-success" onClick={runPayrollReport}>Run Report</button>
                <button className="btn btn-secondary ms-2" onClick={() => setAction(null)}>Cancel</button>
              </div>
            </div>
          )}

          {action === 'reportDept' && (
            <div>
              <div className="mb-2">
                <label className="form-label">Department ID</label>
                <input className="form-control" value={runId} onChange={e => setRunId(e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label">Year</label>
                <input className="form-control" type="number" value={year} onChange={e => setYear(e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label">Month (optional)</label>
                <input className="form-control" type="number" value={month} onChange={e => setMonth(e.target.value)} />
              </div>
              <div>
                <button className="btn btn-success" onClick={runDepartmentReport}>Run Report</button>
                <button className="btn btn-secondary ms-2" onClick={() => setAction(null)}>Cancel</button>
              </div>
            </div>
          )}
          </div>
        </div>

        {action === 'reports' && (
            <div>
              <div className="mb-2">
                <button className="btn btn-primary me-2" onClick={() => { setAction('reportPeriod'); setResult(null); setError(null); }}>Generate payroll report for a period</button>
                <button className="btn btn-primary" onClick={() => { setAction('reportDept'); setResult(null); setError(null); }}>Generate payroll for a department</button>
              </div>
              <div>
                <button className="btn btn-secondary" onClick={() => setAction(null)}>Close</button>
              </div>
            </div>
          )}

      {error && <div className="alert alert-danger">{error}</div>}

      {result && (
        <div>
          {/* If pageable or array, render as table */}
          {Array.isArray(result) || (result && Array.isArray(result.content)) ? (
            (() => {
              const rows = Array.isArray(result) ? result : result.content;
              return (
                <div className="table-responsive card">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Payroll ID</th>
                        <th>Basic Salary</th>
                        <th>Deductions</th>
                        <th>Bonus</th>
                        <th>Net Salary</th>
                        <th>Pay Date</th>
                        <th>Locked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.payrollId || r.id}>
                          <td>{r.payrollId ?? r.id}</td>
                          <td>{formatCurrency(r.basicSalary ?? r.basicSalaryAmount ?? r.basic)}</td>
                          <td>{formatCurrency(r.deductions ?? r.deduction)}</td>
                          <td>{formatCurrency(r.bonus ?? 0)}</td>
                          <td>{formatCurrency(r.netSalary ?? r.net)}</td>
                          <td>{formatDate(r.payDate)}</td>
                          <td>{(r.locked ?? r.isLocked) ? <span className="badge bg-success">Locked</span> : <span className="badge bg-secondary">Open</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()
          ) : (
            // single object or simple message
            (() => {
              if (result.message) {
                return <div className="alert alert-info">{result.message}</div>;
              }
              const r = result;
              return (
                <div className="card">
                  <div className="card-body">
                    <h5>Payroll #{r.payrollId ?? r.id}</h5>
                    <p><strong>Basic Salary:</strong> {formatCurrency(r.basicSalary ?? r.basicSalaryAmount ?? r.basic)}</p>
                    <p><strong>Deductions:</strong> {formatCurrency(r.deductions ?? r.deduction)}</p>
                    <p><strong>Bonus:</strong> {formatCurrency(r.bonus ?? 0)}</p>
                    <p><strong>Net Salary:</strong> {formatCurrency(r.netSalary ?? r.net)}</p>
                    <p><strong>Pay Date:</strong> {formatDate(r.payDate)}</p>
                    <p><strong>Locked:</strong> {(r.locked ?? r.isLocked) ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
}

function formatDate(d) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleString();
  } catch (e) {
    return String(d);
  }
}

function formatCurrency(v) {
  if (v == null) return '';
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(v));
  } catch (e) {
    return String(v);
  }
}

export default PayrollAdmin;
