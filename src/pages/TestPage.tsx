// src/pages/TestPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAssignments, QuestionEntry } from "../contexts/AssignmentsContext";
import Input from "../components/ui/Input";

const TestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { assignments, updateAssignmentStatus } = useAssignments();

  // find the assignment
  const assignment = assignments.find((a) => a.id === id);
  if (!assignment) return <p className="p-8">Assignment not found.</p>;

  // track which question index you’re on
  const [index, setIndex] = useState(0);

  // hold student’s answers in local state
  const [answers, setAnswers] = useState<{ text: string; file: File | null }[]>(
    assignment.questions.map(() => ({ text: "", file: null }))
  );

  const currentQuestion = assignment.questions[index];
  const studentAnswer = answers[index];

  const updateAnswer = (changes: Partial<typeof studentAnswer>) => {
    setAnswers((prev) =>
      prev.map((a, i) => (i === index ? { ...a, ...changes } : a))
    );
  };

  const goNext = () => {
    if (index < assignment.questions.length - 1) {
      setIndex(index + 1);
    }
  };
  const goBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleSubmitTest = () => {
    // Basic validation: ensure all answered
    if (answers.some((a, i) => !a.text.trim())) {
      return alert("Please answer all questions before submitting.");
    }

    // here you’d POST answers to your backend…
    console.log({ assignmentId: id, answers });

    // mark complete
    updateAssignmentStatus(id!, "completed");
    navigate("/assignments");
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-lg shadow">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-1">
        {assignment.subject} — Chapter {assignment.chapterNumber}:{" "}
        {assignment.chapterName}
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Class: {assignment.classLevel}
      </p>

      {/* Question Carousel */}
      <div className="space-y-4">
        <h2 className="font-medium">Question {index + 1}</h2>
        <p className="mb-2">{currentQuestion.question}</p>

        {/* Answer input */}
        <Input
          id={`answer-${index}`}
          label="Your Answer"
          value={studentAnswer.text}
          onChange={(e) => updateAnswer({ text: e.target.value })}
        />

        {/* File upload */}
        <div>
          <label
            htmlFor={`file-${index}`}
            className="block text-sm font-medium mb-1"
          >
            Upload (optional)
          </label>
          <input
            id={`file-${index}`}
            type="file"
            onChange={(e) =>
              updateAnswer({ file: e.target.files?.[0] ?? null })
            }
          />
        </div>

        {/* Marks display (teacher’s) */}
        <p className="text-sm text-gray-500">Marks: {currentQuestion.marks}</p>
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={goBack}
          disabled={index === 0}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Back
        </button>
        {index < assignment.questions.length - 1 ? (
          <button
            onClick={goNext}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitTest}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPage;
