import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RoleNav from './components/RoleNav';
import EmployeesList from './pages/EmployeesList';
import EmployeeView from './pages/EmployeeView';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDelete from './pages/EmployeeDelete';
import DepartmentsList from './pages/DepartmentsList';
import DepartmentForm from './pages/DepartmentForm';
import DepartmentDelete from './pages/DepartmentDelete';
import DepartmentView from './pages/DepartmentView';
import PayrollAdmin from './pages/PayrollAdmin';
import JobsList from './pages/JobsList';
import JobForm from './pages/JobForm';
import JobView from './pages/JobView';
import JobDelete from './pages/JobDelete';
import UsersList from './pages/UsersList';
import UserForm from './pages/UserForm';
import AdminLeaves from './pages/AdminLeave';

function App() {
  return (
    <div>
      <RoleNav />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <EmployeesList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employees/new"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <EmployeeForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employees/:id"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <EmployeeView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employees/:id/edit"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <EmployeeForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employees/:id/delete"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <EmployeeDelete />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/departments"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <DepartmentsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <JobsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs/new"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <JobForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs/:id/edit"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <JobForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs/:id/delete"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <JobDelete />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs/:id"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <JobView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/departments/new"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <DepartmentForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/departments/:id/edit"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <DepartmentForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/departments/:id/delete"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <DepartmentDelete />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/departments/:id"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <DepartmentView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/payroll"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <PayrollAdmin />
              </ProtectedRoute>
            }
          />
          
          {/* <Route
            path="/admin/reports"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <ReportsAdmin />
              </ProtectedRoute>
            }
          /> */}
          
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <UsersList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/leaves"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLeaves />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users/new"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <UserForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/*"
            element={
              <ProtectedRoute roleRequired="EMPLOYEE">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
