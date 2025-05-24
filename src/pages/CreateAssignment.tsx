// // src/pages/CreateAssignment.tsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Input from "../components/ui/Input"; // your forwardRef input
// import { useAuth } from "../contexts/AuthContext";

// const SUBJECTS = [
//   "Mathematics",
//   "Biology",
//   "History",
//   "Chemistry",
//   "Physics",
//   // …etc
// ];

// // static lists; feel free to pull in from constants or API
// const CLASSES = ["5th Grade", "6th Grade", "7th Grade", "8th Grade"];
// const CHAPTER_COUNT = 7; // if you need per-subject counts, switch this to a map

// const CreateAssignment: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [subject, setSubject] = useState<string>(SUBJECTS[0]);
//   const [classLevel, setClassLevel] = useState<string>(CLASSES[0]);
//   const [chapterNumber, setChapterNumber] = useState<number>(1);
//   const [chapterName, setChapterName] = useState<string>("");
//   const [deadline, setDeadline] = useState<string>("");
//   const [notesFile, setNotesFile] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // basic validation
//     if (!chapterName.trim() || !deadline || !notesFile) {
//       setError(
//         "Please fill in chapter name, deadline and upload your notes file."
//       );
//       return;
//     }

//     // Build your form data
//     const formData = new FormData();
//     formData.append("teacherEmail", user!.email);
//     formData.append("subject", subject);
//     formData.append("classLevel", classLevel);
//     formData.append("chapterNumber", chapterNumber.toString());
//     formData.append("chapterName", chapterName.trim());
//     formData.append("deadline", deadline);
//     formData.append("notes", notesFile);

//     // TODO: POST this to your backend
//     // await fetch('/api/assignments', { method: 'POST', body: formData });

//     // for now, just go back:
//     navigate("/assignments");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-semibold mb-6">Create New Assignment</h1>
//       {error && <p className="mb-4 text-red-600">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         {/* Subject Dropdown */}
//         <label className="block mb-2 text-sm font-medium">Subject</label>
//         <select
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           className="w-full mb-4 p-2 border rounded"
//         >
//           {SUBJECTS.map((subj) => (
//             <option key={subj} value={subj}>
//               {subj}
//             </option>
//           ))}
//         </select>

//         {/* Chapter Number */}
//         <div>
//           <label
//             htmlFor="chapterNumber"
//             className="block text-sm font-medium mb-1"
//           >
//             Chapter Number
//           </label>
//           <select
//             id="chapterNumber"
//             value={chapterNumber}
//             onChange={(e) => setChapterNumber(Number(e.target.value))}
//             className="w-full p-2 border rounded"
//           >
//             {chapterOptions.map((num) => (
//               <option key={num} value={num}>
//                 Chapter {num}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Chapter Name */}
//         <Input
//           id="chapterName"
//           label="Chapter Name"
//           placeholder="e.g. Photosynthesis"
//           value={chapterName}
//           onChange={(e) => setChapterName(e.target.value)}
//         />

//         {/* Deadline Date */}
//         <Input
//           id="deadline"
//           label="Deadline"
//           type="date"
//           value={deadline}
//           onChange={(e) => setDeadline(e.target.value)}
//         />

//         {/* File Upload */}
//         <div className="mb-4">
//           <label htmlFor="notes" className="block text-sm font-medium mb-1">
//             Upload Notes
//           </label>
//           <input
//             id="notes"
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => setNotesFile(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Create Assignment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateAssignment;

// src/pages/CreateAssignment.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Input from "../components/ui/Input"; // your forwardRef input

// static lists; feel free to pull in from constants or API
const SUBJECTS = ["Mathematics", "Biology", "History", "Chemistry", "Physics"];
const CLASSES = ["5th Grade", "6th Grade", "7th Grade", "8th Grade"];
const CHAPTER_COUNT = 7; // if you need per-subject counts, switch this to a map

const CreateAssignment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // form state
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [classLevel, setClassLevel] = useState<string>(CLASSES[0]);
  const [chapterNumber, setChapterNumber] = useState<number>(1);
  const [chapterName, setChapterName] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [notesFile, setNotesFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!chapterName.trim() || !deadline || !notesFile) {
      setError(
        "Please fill in chapter name, deadline and upload your notes file."
      );
      return;
    }

    // bundle up the metadata
    const meta = { subject, classLevel, chapterNumber, chapterName };

    // prepare payload
    const formData = new FormData();
    formData.append("teacherEmail", user!.email);
    formData.append("subject", subject);
    formData.append("classLevel", classLevel);
    formData.append("chapterNumber", chapterNumber.toString());
    formData.append("chapterName", chapterName.trim());
    formData.append("deadline", deadline);
    formData.append("notes", notesFile);

    // TODO: POST to your backend, e.g.
    // await fetch('/api/assignments', { method: 'POST', body: formData });

    // then redirect back to review list
    //navigate('/assignments/');
    navigate("/create-assignment/questions", { state: meta });
  };

  // build an array [1,2,3…CHAPTER_COUNT]
  const chapterOptions = Array.from({ length: CHAPTER_COUNT }, (_, i) => i + 1);

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">Create New Assignment</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Subject
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {SUBJECTS.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Class */}
        <div>
          <label
            htmlFor="classLevel"
            className="block text-sm font-medium mb-1"
          >
            Class
          </label>
          <select
            id="classLevel"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Number */}
        <div>
          <label
            htmlFor="chapterNumber"
            className="block text-sm font-medium mb-1"
          >
            Chapter Number
          </label>
          <select
            id="chapterNumber"
            value={chapterNumber}
            onChange={(e) => setChapterNumber(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            {chapterOptions.map((num) => (
              <option key={num} value={num}>
                Chapter {num}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Name */}
        <Input
          id="chapterName"
          label="Chapter Name"
          placeholder="e.g. Photosynthesis"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
        />

        {/* Deadline */}
        <Input
          id="deadline"
          label="Deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        {/* File Upload */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Upload Notes
          </label>
          <input
            id="notes"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setNotesFile(e.target.files?.[0] ?? null)}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
