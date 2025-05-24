import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import MyAssignments from "./pages/MyAssignments";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreateAssignment from "./pages/CreateAssignment";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* nested routes render into the <Outlet /> */}
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="create-assignment" element={<CreateAssignment />} />
              <Route path="assignments" element={<MyAssignments />} />
              {/* add other routes as needed */}
            </Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assignments"
              element={
                <ProtectedRoute>
                  <MyAssignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-assignment"
              element={
                <ProtectedRoute>
                  <CreateAssignment />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
