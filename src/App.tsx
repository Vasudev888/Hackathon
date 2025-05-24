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
import AssignmentsPage from "./pages/MyAssignments";
import CreateAssignment from "./pages/CreateAssignment";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import QuestionnairePage from "./pages/QuestionnairePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected + Sidebar Layout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* default → /dashboard */}
              <Route index element={<Navigate to="dashboard" replace />} />

              {/* Nested pages render inside DashboardLayout’s <Outlet /> */}
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="create-assignment" element={<CreateAssignment />} />
              <Route
                path="create-assignment/questions"
                element={<QuestionnairePage />}
              />
              <Route path="assignments" element={<AssignmentsPage />} />

              {/* …add more nested routes here… */}
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
