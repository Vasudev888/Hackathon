import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  LineChart,
  Settings,
  LogOut,
} from "lucide-react";
import CreateAssignmentModal from "../components/CreateAssignmentModal";

const DashboardHome: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isTeacher = user?.role === "teacher";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold">AssignAI</h1>
        </div>

        {/* User Info */}
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

        {/* Navigation */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              active
            />
            {isTeacher ? (
              <>
                <NavItem
                  icon={<ClipboardList size={20} />}
                  text="Create Assignment"
                  //onClick={() => navigate("/create-assignment")}
                  onClick={() => setShowCreateModal(true)}
                />
                <NavItem
                  icon={<ClipboardList size={20} />}
                  text="Review Assignments"
                />
                <NavItem icon={<Users size={20} />} text="Students" />
                <NavItem icon={<LineChart size={20} />} text="Analytics" />
              </>
            ) : (
              <>
                <NavItem
                  icon={<ClipboardList size={20} />}
                  text="My Assignments"
                  onClick={() => navigate("/assignments")}
                />
                <NavItem icon={<LineChart size={20} />} text="Feedback" />
              </>
            )}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-64 border-t border-gray-200">
          <ul className="px-4 py-6 space-y-2">
            <NavItem icon={<Settings size={20} />} text="Settings" />
            <NavItem
              icon={<LogOut size={20} />}
              text="Logout"
              onClick={handleLogout}
            />
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">
              {isTeacher ? "Teacher Dashboard" : "Student Dashboard"}
            </h2>
            {isTeacher && (
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                View All Assignments
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {isTeacher ? (
              <>
                <StatCard title="Total Students" value="24" subtext="+2 new" />
                <StatCard
                  title="Pending Reviews"
                  value="14"
                  subtext="8 urgent"
                />
                <StatCard title="Class Average" value="78%" subtext="+2.1%" />
              </>
            ) : (
              <>
                <StatCard title="Assignments" value="12" subtext="+2 new" />
                <StatCard title="Completed" value="8" subtext="67%" />
                <StatCard title="Average Score" value="78%" subtext="+4.2%" />
              </>
            )}
          </div>

          {isTeacher ? (
            <TeacherDashboardContent />
          ) : (
            <StudentDashboardContent
              onViewAll={() => navigate("/assignments")}
            />
          )}
        </div>
      </div>
      {/* Modal */}
      {showCreateModal && (
        <CreateAssignmentModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

const TeacherDashboardContent: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Assignment Progress */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Assignment Progress</h3>
        <p className="text-sm text-gray-600 mb-4">
          Overview of current assignments
        </p>

        <div className="space-y-6">
          <AssignmentProgress
            title="Linear Equations"
            subject="Mathematics"
            dueDate="May 15, 2025"
            progress={75}
            avgScore="78%"
            completed={18}
            total={24}
          />
          <AssignmentProgress
            title="Cell Biology Research"
            subject="Biology"
            dueDate="May 18, 2025"
            progress={63}
            avgScore="72%"
            completed={15}
            total={24}
          />
          <AssignmentProgress
            title="World War II Essay"
            subject="History"
            dueDate="May 25, 2025"
            progress={42}
            avgScore="85%"
            completed={10}
            total={24}
          />
        </div>
      </div>

      {/* Pending Reviews */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Pending Reviews</h3>
        <p className="text-sm text-gray-600 mb-4">
          Assignments waiting for review
        </p>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-4">Student</th>
              <th className="pb-4">Assignment</th>
              <th className="pb-4">Submitted</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <PendingReviewRow
              student="Alex Johnson"
              assignment="Linear Equations"
              date="May 22, 2025"
              status="pending"
            />
            <PendingReviewRow
              student="Emma Davis"
              assignment="Cell Biology Research"
              date="May 21, 2025"
              status="in-review"
            />
            <PendingReviewRow
              student="Michael Smith"
              assignment="World War II Essay"
              date="May 20, 2025"
              status="reviewed"
            />
            <PendingReviewRow
              student="Sophia Lee"
              assignment="Linear Equations"
              date="May 20, 2025"
              status="in-review"
            />
            <PendingReviewRow
              student="William Brown"
              assignment="Cell Biology Research"
              date="May 19, 2025"
              status="pending"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StudentDashboardContent: React.FC<{ onViewAll: () => void }> = ({
  onViewAll,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Recent Assignments</h3>
      <div className="grid gap-4">
        <AssignmentCard
          subject="Mathematics"
          title="Linear Equations"
          dueDate="May 15, 2025"
          score="85%"
          status="validated"
        />
        <AssignmentCard
          subject="Biology"
          title="Cell Biology Research"
          dueDate="May 18, 2025"
          score="72%"
          status="needs-revision"
        />
        <AssignmentCard
          subject="History"
          title="World War II Essay"
          dueDate="May 25, 2025"
          score=""
          status="pending"
        />
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={onViewAll}
          className="text-gray-600 hover:text-gray-900 flex items-center justify-center w-full"
        >
          <ClipboardList className="mr-2" size={20} />
          View All Assignments
        </button>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
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

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h4 className="text-gray-600 text-sm">{title}</h4>
      <div className="flex items-baseline mt-2">
        <div className="text-2xl font-semibold">{value}</div>
        <div className="ml-2 text-sm text-green-500">{subtext}</div>
      </div>
    </div>
  );
};

interface AssignmentProgressProps {
  title: string;
  subject: string;
  dueDate: string;
  progress: number;
  avgScore: string;
  completed: number;
  total: number;
}

const AssignmentProgress: React.FC<AssignmentProgressProps> = ({
  title,
  subject,
  dueDate,
  progress,
  avgScore,
  completed,
  total,
}) => {
  return (
    <div>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-gray-500">{subject}</div>
          <div className="font-medium">{title}</div>
        </div>
        <div className="text-sm text-gray-500">Due: {dueDate}</div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full mb-2">
        <div
          className="h-full bg-black rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span>Avg. Score: {avgScore}</span>
        <span>
          {completed}/{total} Complete
        </span>
      </div>
    </div>
  );
};

interface PendingReviewRowProps {
  student: string;
  assignment: string;
  date: string;
  status: "pending" | "in-review" | "reviewed";
}

const PendingReviewRow: React.FC<PendingReviewRowProps> = ({
  student,
  assignment,
  date,
  status,
}) => {
  const getStatusDisplay = () => {
    switch (status) {
      case "pending":
        return (
          <span className="text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
            Pending
          </span>
        );
      case "in-review":
        return (
          <span className="text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
            In Review
          </span>
        );
      case "reviewed":
        return (
          <span className="text-green-500 bg-green-50 px-2 py-1 rounded-full">
            Reviewed
          </span>
        );
    }
  };

  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-3">{student}</td>
      <td className="py-3">{assignment}</td>
      <td className="py-3">{date}</td>
      <td className="py-3">{getStatusDisplay()}</td>
    </tr>
  );
};

interface AssignmentCardProps {
  subject: string;
  title: string;
  dueDate: string;
  score: string;
  status: "validated" | "needs-revision" | "pending";
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  subject,
  title,
  dueDate,
  score,
  status,
}) => {
  const getStatusDisplay = () => {
    switch (status) {
      case "validated":
        return (
          <span className="text-green-500 bg-green-50 px-2 py-1 rounded-full text-sm">
            Validated
          </span>
        );
      case "needs-revision":
        return (
          <span className="text-orange-500 bg-orange-50 px-2 py-1 rounded-full text-sm">
            Needs Revision
          </span>
        );
      case "pending":
        return (
          <span className="text-blue-500 bg-blue-50 px-2 py-1 rounded-full text-sm">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-gray-500">{subject}</div>
          <div className="font-medium">{title}</div>
        </div>
        {getStatusDisplay()}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">
          <span className="text-gray-500">Due Date: </span>
          {dueDate}
        </div>
        <div className="flex items-center space-x-2">
          {score && <span className="font-medium">Score: {score}</span>}
          <button className="text-gray-600 hover:text-gray-900">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
