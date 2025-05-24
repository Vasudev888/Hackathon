import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ClipboardList, CheckCircle, XCircle } from "lucide-react";

// ——— Teacher View ———
const TeacherAssignments: React.FC = () => {
  const navigate = useNavigate();
  // hard-coded data for demo; swap in your real fetch logic
  const rows = [
    {
      student: "Alex Johnson",
      assignment: "Linear Equations",
      date: "May 22, 2025",
      status: "Pending",
    },
    {
      student: "Emma Davis",
      assignment: "Cell Biology Research",
      date: "May 21, 2025",
      status: "In Review",
    },
    {
      student: "Michael Smith",
      assignment: "World War II Essay",
      date: "May 20, 2025",
      status: "Reviewed",
    },
    // …etc
  ];

  const statusClass = (s: string) => {
    if (s === "Pending") return "text-blue-500 bg-blue-50";
    if (s === "In Review") return "text-orange-500 bg-orange-50";
    if (s === "Reviewed") return "text-green-500 bg-green-50";
    return "";
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Review Assignments</h1>
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th className="p-4">Student</th>
            <th className="p-4">Assignment</th>
            <th className="p-4">Submitted</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-4">{r.student}</td>
              <td className="p-4">{r.assignment}</td>
              <td className="p-4">{r.date}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full ${statusClass(r.status)}`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/create-assignment")}
          className="inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          <ClipboardList className="mr-2" size={16} />
          Create New Assignment
        </button>
      </div>
    </div>
  );
};

// ——— Student View ———
const StudentAssignments: React.FC = () => {
  const [filter, setFilter] = React.useState<
    "in-progress" | "completed" | "not-started"
  >("in-progress");
  // demo data
  const assignments = [
    {
      subject: "Biology",
      title: "Cell Biology Research",
      due: "May 18, 2025",
      status: "in-progress",
    },
    {
      subject: "Chemistry",
      title: "Chemical Reactions",
      due: "May 20, 2025",
      status: "in-progress",
    },
    {
      subject: "Math",
      title: "Linear Equations",
      due: "May 15, 2025",
      status: "completed",
    },
    // …etc
  ];

  const filtered = assignments.filter((a) => {
    if (filter === "not-started") return a.status === "not-started";
    return a.status === filter;
  });

  const statusLabel = (s: string) => {
    if (s === "in-progress")
      return (
        <span className="text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
          In Progress
        </span>
      );
    if (s === "completed")
      return (
        <span className="text-green-500 bg-green-50 px-2 py-1 rounded-full">
          Completed
        </span>
      );
    if (s === "not-started")
      return (
        <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          Not Started
        </span>
      );
    return null;
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">My Assignments</h1>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            filter === "in-progress" ? "bg-black text-white" : "bg-gray-100"
          }`}
          onClick={() => setFilter("in-progress")}
        >
          <ClipboardList className="inline-block mr-1" size={16} />
          In Progress
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "completed" ? "bg-black text-white" : "bg-gray-100"
          }`}
          onClick={() => setFilter("completed")}
        >
          <CheckCircle className="inline-block mr-1" size={16} />
          Completed
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "not-started" ? "bg-black text-white" : "bg-gray-100"
          }`}
          onClick={() => setFilter("not-started")}
        >
          <XCircle className="inline-block mr-1" size={16} />
          Not Started
        </button>
      </div>

      {/* Assignment Cards */}
      <div className="space-y-4">
        {filtered.map((a, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200"
          >
            <div>
              <div className="text-sm text-gray-500">{a.subject}</div>
              <div className="font-medium">{a.title}</div>
              <div className="text-sm text-gray-500">Due Date: {a.due}</div>
            </div>
            <div className="flex items-center space-x-4">
              {statusLabel(a.status)}
              <button className="text-gray-600 hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ——— Main switcher ———
const AssignmentsPage: React.FC = () => {
  const { user } = useAuth();
  return user?.role === "teacher" ? (
    <TeacherAssignments />
  ) : (
    <StudentAssignments />
  );
};

export default AssignmentsPage;
