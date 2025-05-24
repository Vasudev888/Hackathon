import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ClipboardList, CheckCircle, XCircle } from "lucide-react";
import { useAssignments, Assignment } from "../contexts/AssignmentsContext";
//const [filter, setFilter] = useState<"in-progress" | "completed" | "not-started">("in-progress");

const TABS = [
  { key: "not-started", label: "Not Started" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
] as const;

// ——— Teacher View ———
const TeacherAssignments: React.FC = () => {
  const navigate = useNavigate();
  // you can also pull assignments from context here if you like
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
          {/* still demo data — replace with context/fetch when ready */}
          {[
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
          ].map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-4">{r.student}</td>
              <td className="p-4">{r.assignment}</td>
              <td className="p-4">{r.date}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full ${
                    r.status === "Pending"
                      ? "text-blue-500 bg-blue-50"
                      : r.status === "In Review"
                      ? "text-orange-500 bg-orange-50"
                      : "text-green-500 bg-green-50"
                  }`}
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
  const navigate = useNavigate();

  // ← NEW: pull from context instead of hard-coded array
  const { assignments, updateAssignmentStatus } = useAssignments();
  //const [filter, setFilter] = useState<TABS[number]["key"]>("in-progress");
  // pull the union of keys out as a proper type:
  type TabKey = (typeof TABS)[number]["key"];
  const [filter, setFilter] = useState<TabKey>("in-progress");
  // only show the ones matching the current tab
  const filtered = assignments.filter((a) => a.status === filter);

  const statusLabel = (s: Assignment["status"]) => {
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
    return (
      <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
        Not Started
      </span>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">My Assignments</h1>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`px-4 py-2 rounded ${
              filter === t.key ? "bg-black text-white" : "bg-gray-100"
            }`}
            onClick={() => setFilter(t.key)}
          >
            {t.key === "in-progress" && (
              <ClipboardList className="inline-block mr-1" size={16} />
            )}
            {t.key === "completed" && (
              <CheckCircle className="inline-block mr-1" size={16} />
            )}
            {t.key === "not-started" && (
              <XCircle className="inline-block mr-1" size={16} />
            )}
            {t.label}
          </button>
        ))}
      </div>

      {/* Assignment Cards */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No assignments in this section.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200"
            >
              <div>
                <div className="text-sm text-gray-500">{a.subject}</div>
                <div className="font-medium">
                  Chapter {a.chapterNumber}: {a.chapterName}
                </div>
                <div className="text-sm text-gray-500">
                  Class: {a.classLevel}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {statusLabel(a.status)}
                {a.status === "not-started" && (
                  <button
                    onClick={() => navigate(`/assignments/${a.id}/take`)}
                    className="text-blue-600 hover:underline"
                  >
                    Start
                  </button>
                )}
                {a.status === "in-progress" && (
                  <button
                    onClick={() => updateAssignmentStatus(a.id, "completed")}
                    className="text-green-600 hover:underline"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
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
