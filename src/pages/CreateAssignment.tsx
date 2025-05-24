// src/pages/CreateAssignment.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input'; // your forwardRef input
import { useAuth } from '../contexts/AuthContext';

const SUBJECTS = [
  'Mathematics',
  'Biology',
  'History',
  'Chemistry',
  'Physics',
  // …etc
];

const CreateAssignment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [deadline, setDeadline] = useState<string>('');
  const [notesFile, setNotesFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deadline || !notesFile) {
      setError('Please select a deadline date and upload your notes file.');
      return;
    }

    // Build your form data
    const formData = new FormData();
    formData.append('teacherEmail', user!.email);
    formData.append('subject', subject);
    formData.append('deadline', deadline);
    formData.append('notes', notesFile);

    // TODO: POST this to your backend
    // await fetch('/api/assignments', { method: 'POST', body: formData });

    // for now, just go back:
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-6">Create New Assignment</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Subject Dropdown */}
        <label className="block mb-2 text-sm font-medium">Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          {SUBJECTS.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>

        {/* Deadline Date */}
        <Input
          id="deadline"
          label="Deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        {/* File Upload */}
        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Upload Notes
          </label>
          <input
            id="notes"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setNotesFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
