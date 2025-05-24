// src/pages/QuestionnairePage.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import Input from "../components/ui/Input";
import { useAssignments } from "../contexts/AssignmentsContext";

interface Meta {
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterName: string;
}

interface QuestionEntry {
  question: string;
  answer: string;
  marks: 2 | 5 | 10;
  file?: File | null;
}

const QUESTION_MARKS: QuestionEntry["marks"][] = [2, 5, 10];

const QuestionnairePage: React.FC = () => {
  const { addAssignment } = useAssignments();
  const navigate = useNavigate();
  const { state } = useLocation();
  const meta = (state as Meta) || {
    subject: "Unknown",
    classLevel: "",
    chapterNumber: 1,
    chapterName: "",
  };

  const [questions, setQuestions] = useState<QuestionEntry[]>([
    { question: "", answer: "", marks: 2, file: null },
  ]);
  const [error, setError] = useState<string | null>(null);

  const addQuestion = () => {
    setQuestions((q) => [
      ...q,
      { question: "", answer: "", marks: 2, file: null },
    ]);
  };

  const updateEntry = (index: number, changes: Partial<QuestionEntry>) => {
    setQuestions((q) =>
      q.map((entry, i) => (i === index ? { ...entry, ...changes } : entry))
    );
  };

  const handleSubmit = () => {
    // basic validation
    if (questions.some((q) => !q.question.trim() || !q.answer.trim())) {
      setError("All questions and answers must be filled in.");
      return;
    }

    // build payload
    const payload = {
      meta,
      questions: questions.map(({ file, ...rest }) => rest),
      // if you need the files, you'd also send FormData
    };

    console.log("Submitting questionnaire payload:", payload);
    // TODO: send to backend
    addAssignment({
      subject: meta.subject,
      classLevel: meta.classLevel,
      chapterNumber: meta.chapterNumber,
      chapterName: meta.chapterName,
      questions,
      status: "not-started",
    });

    // go back to assignment list
    navigate("/assignments");
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-2">
        {meta.subject} — Chapter {meta.chapterNumber}: {meta.chapterName}
      </h1>
      <p className="text-sm text-gray-600 mb-6">Class: {meta.classLevel}</p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="space-y-8">
        {questions.map((entry, idx) => (
          <div key={idx} className="space-y-4 border-b pb-4">
            <h2 className="font-medium">Question {idx + 1}</h2>

            {/* Question text */}
            <Input
              id={`q-${idx}`}
              label="Question"
              value={entry.question}
              onChange={(e) => updateEntry(idx, { question: e.target.value })}
            />

            {/* Answer text */}
            <Input
              id={`a-${idx}`}
              label="Answer"
              value={entry.answer}
              onChange={(e) => updateEntry(idx, { answer: e.target.value })}
            />

            <div className="flex space-x-4 items-center">
              {/* Marks dropdown */}
              <div className="flex-1">
                <label
                  htmlFor={`m-${idx}`}
                  className="block text-sm font-medium mb-1"
                >
                  Marks
                </label>
                <select
                  id={`m-${idx}`}
                  value={entry.marks}
                  onChange={(e) =>
                    updateEntry(idx, { marks: Number(e.target.value) as any })
                  }
                  className="w-full p-2 border rounded"
                >
                  {QUESTION_MARKS.map((m) => (
                    <option key={m} value={m}>
                      {m} marks
                    </option>
                  ))}
                </select>
              </div>

              {/* File upload */}
              <div className="flex-1">
                <label
                  htmlFor={`f-${idx}`}
                  className="block text-sm font-medium mb-1"
                >
                  Upload (optional)
                </label>
                <input
                  id={`f-${idx}`}
                  type="file"
                  onChange={(e) =>
                    updateEntry(idx, { file: e.target.files?.[0] ?? null })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add new question */}
      <button
        onClick={addQuestion}
        className="mt-6 inline-flex items-center px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        <ClipboardList className="mr-2" size={16} />
        Add Question
      </button>

      {/* Final submit */}
      <div className="mt-8 text-right">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit All
        </button>
      </div>
    </div>
  );
};

export default QuestionnairePage;
