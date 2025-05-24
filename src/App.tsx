// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import LoginPage from "./pages/LoginPage";
// import DashboardLayout from "./components/Layouts/DashboardLayout";
// import DashboardHome from "./pages/DashboardHome";
// import AssignmentsPage from "./pages/MyAssignments";
// import CreateAssignment from "./pages/CreateAssignment";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import QuestionnairePage from "./pages/QuestionnairePage";
// import { AssignmentsProvider } from "./contexts/AssignmentsContext";
// import TestPage from "./pages/TestPage";

// function App() {
//   return (
//     <AuthProvider>
//       <AssignmentsProvider>
//         <Router>
//           <div className="min-h-screen bg-gray-50">
//             <Routes>
//               {/* Public */}
//               <Route path="/login" element={<LoginPage />} />

//               {/* Protected + Sidebar Layout */}
//               <Route
//                 path="/"
//                 element={
//                   <ProtectedRoute>
//                     <DashboardLayout />
//                   </ProtectedRoute>
//                 }
//               >
//                 {/* default → /dashboard */}
//                 <Route index element={<Navigate to="dashboard" replace />} />

//                 {/* Nested pages render inside DashboardLayout’s <Outlet /> */}
//                 <Route path="dashboard" element={<DashboardHome />} />
//                 <Route
//                   path="create-assignment"
//                   element={<CreateAssignment />}
//                 />
//                 <Route
//                   path="create-assignment/questions"
//                   element={<QuestionnairePage />}
//                 />
//                 <Route path="assignments" element={<AssignmentsPage />} />
//                 <Route path="assignments/:id/take" element={<TestPage />} />

//                 {/* …add more nested routes here… */}
//               </Route>

//               {/* Fallback */}
//               <Route path="*" element={<Navigate to="/login" replace />} />
//             </Routes>
//           </div>
//         </Router>
//       </AssignmentsProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AssignmentsProvider } from "./contexts/AssignmentsContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import CreateAssignment from "./pages/CreateAssignment";
import QuestionnairePage from "./pages/QuestionnairePage";
import MyAssignments from "./pages/MyAssignments";   // <-- your file
import TestPage from "./pages/TestPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <AssignmentsProvider>       {/* ← wrap here */}
        <Router>
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
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="create-assignment" element={<CreateAssignment />} />
              <Route
                path="create-assignment/questions"
                element={<QuestionnairePage />}
              />
              <Route path="assignments" element={<MyAssignments />} />
              <Route
                path="assignments/:id/take"
                element={<TestPage />}
              />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AssignmentsProvider>     {/* ← and close here */}
    </AuthProvider>
  );
}

export default App;
