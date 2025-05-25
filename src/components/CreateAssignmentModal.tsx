// src/components/CreateAssignmentModal.tsx
import React, { useState } from "react";
import Input from "./ui/Input";
import { X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const SUBJECTS = [
  "Mathematics",
  "Biology",
  "History",
  // …etc
];

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const CreateAssignmentModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const { user } = useAuth();
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [deadline, setDeadline] = useState("");
  const [notesFile, setNotesFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState<[] | null>(null);

  axios.get("http://10.0.0.4:8080/api/subject",{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  }).then(e=>{
    console.log(e)
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deadline || !notesFile) {
      setError("Deadline and notes are required.");
      return;
    }

    // build formData and POST…
    // const form = new FormData();
    // form.append('teacherEmail', user!.email);
    // form.append('subject', subject);
    // form.append('deadline', deadline);
    // form.append('notes', notesFile);
    // await fetch('/api/assignments', { method: 'POST', body: form });

    onCreated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>
        {error && <p className="mb-3 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Subject */}
          <label className="block mb-1 text-sm font-medium">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Deadline */}
          <Input
            id="deadline"
            type="date"
            label="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          {/* Notes upload */}
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Upload Notes
            </label>
            <input
              id="notes"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setNotesFile(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;
