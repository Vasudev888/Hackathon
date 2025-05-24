// src/contexts/AssignmentsContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

export type QuestionEntry = {
  question: string;
  answer: string;
  marks: number;
  file?: File | null;
};

export type Assignment = {
  id: string;
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterName: string;
  questions: QuestionEntry[];
  status: "not-started" | "in-progress" | "completed";
  createdAt: Date;
};

interface AssignmentsContextType {
  assignments: Assignment[];
  addAssignment: (a: Omit<Assignment, "id" | "createdAt">) => void;
  updateAssignmentStatus: (id: string, status: Assignment["status"]) => void;
}

// const AssignmentsContext = createContext<AssignmentsContextType | undefined>(
//   undefined
// );
const AssignmentsContext = createContext<AssignmentsContextType | null>(null);

export function useAssignments() {
  const ctx = useContext(AssignmentsContext);
  if (!ctx)
    throw new Error("useAssignments must be used inside AssignmentsProvider");
  return ctx;
}


export function AssignmentsProvider({ children }: { children: ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const addAssignment = (data: Omit<Assignment, "id" | "createdAt">) => {
    const newA: Assignment = {
      ...data,
      id: Math.random().toString(36).slice(2),
      createdAt: new Date(),
    };
    setAssignments((prev) => [newA, ...prev]);
  };

  const updateAssignmentStatus = (id: string, status: Assignment["status"]) => {
    setAssignments((a) =>
      a.map((assn) => (assn.id === id ? { ...assn, status } : assn))
    );
  };

  return (
    <AssignmentsContext.Provider
      value={{ assignments, addAssignment, updateAssignmentStatus }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
}


// export function useAssignments() {
//   const ctx = useContext(AssignmentsContext);
//   if (!ctx)
//     throw new Error("useAssignments must be inside AssignmentsProvider");
//   return ctx;
// }

// export const AssignmentsProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [assignments, setAssignments] = useState<Assignment[]>([]);

//   const addAssignment = (data: Omit<Assignment, "id" | "createdAt">) => {
//     const newA: Assignment = {
//       ...data,
//       id: Math.random().toString(36).slice(2),
//       createdAt: new Date(),
//     };
//     setAssignments((a) => [newA, ...a]);
//   };