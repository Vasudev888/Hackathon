// src/components/DashboardLayout.tsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  LineChart,
  Settings,
  LogOut,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to?: string;
  onClick?: () => void;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  text,
  to,
  onClick,
  active,
}) => {
  const navigate = useNavigate();
  const handle = onClick ?? (() => to && navigate(to));
  return (
    <li>
      <button
        onClick={handle}
        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
          active
            ? "bg-gray-100 text-black"
            : "text-gray-600 hover:bg-gray-50 hover:text-black"
        }`}
      >
        {icon}
        <span>{text}</span>
      </button>
    </li>
  );
};

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isTeacher = user?.role === "teacher";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h1 className="text-xl font-bold">AssignAI</h1>
          </div>
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div>
                <div className="font-medium">
                  {isTeacher ? "Mary Teacher" : "John Student"}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {user?.role}
                </div>
              </div>
            </div>
          </div>
          <nav className="px-4 py-6">
            <ul className="space-y-2">
              <NavItem
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                to="/dashboard"
              />
              {isTeacher ? (
                <>
                  <NavItem
                    icon={<ClipboardList size={20} />}
                    text="Create Assignment"
                    to="/create-assignment"
                  />
                  <NavItem
                    icon={<ClipboardList size={20} />}
                    text="Review Assignments"
                    to="/assignments"
                  />
                  <NavItem
                    icon={<Users size={20} />}
                    text="Students"
                    to="/students"
                  />
                  <NavItem
                    icon={<LineChart size={20} />}
                    text="Analytics"
                    to="/analytics"
                  />
                </>
              ) : (
                <>
                  <NavItem
                    icon={<ClipboardList size={20} />}
                    text="My Assignments"
                    to="/assignments"
                  />
                  <NavItem
                    icon={<LineChart size={20} />}
                    text="Feedback"
                    to="/feedback"
                  />
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Bottom nav */}
        <div className="px-4 py-6 border-t border-gray-200">
          <ul className="space-y-2">
            <NavItem
              icon={<Settings size={20} />}
              text="Settings"
              to="/settings"
            />
            <NavItem
              icon={<LogOut size={20} />}
              text="Logout"
              onClick={handleLogout}
            />
          </ul>
        </div>
      </div>

      {/* Main content Outlet */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
