import React, { useState } from 'react';
import ModuleHeader from '../components/ModuleHeader';
import { getMyNetPay } from '../services/payrollService';

function EmployeePayroll() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setError(null);
    setResult(null);
    if (!year || !month) {
      setError('Year and month are required');
      return;
    }
    try {
      const res = await getMyNetPay(year, month);
      setResult(res);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch net pay');
    }
  };

  return (
    <div>
      <ModuleHeader title="Payroll" />
      <div className="card p-3 mb-3">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-2">
          <div className="col-3">
            <input className="form-control" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
          </div>
          <div className="col-3">
            <input className="form-control" placeholder="Month (1-12)" value={month} onChange={e => setMonth(e.target.value)} />
          </div>
          <div className="col-3">
            <button className="btn btn-primary" onClick={handleGenerate}>Generate</button>
          </div>
        </div>
      </div>

      {result && result.length > 0 && result.map((item) => (
        <div key={item.payrollId} className="card p-3">
          <h5>Net Pay</h5>
          <p><strong>Basic Salary:</strong> {item.basicSalary}</p>
          <p><strong>Deductions:</strong> {item.deductions}</p>
          <p><strong>Bonus:</strong> {item.bonus}</p>
          <p><strong>Net Salary:</strong> {item.netSalary}</p>
          <p><strong>Pay Date:</strong> {item.payDate ? item.payDate.split("T")[0] : ""}</p>
        </div>
      ))}
    </div>
  );
}

export default EmployeePayroll;
