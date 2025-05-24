import React, { useState } from 'react';
import { Book, Clock, CheckCircle, XCircle } from 'lucide-react';

type AssignmentStatus = 'in-progress' | 'completed' | 'not-started';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: AssignmentStatus;
  score?: string;
}

const MyAssignments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AssignmentStatus>('in-progress');

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Linear Equations',
      subject: 'Mathematics',
      dueDate: 'May 15, 2025',
      status: 'completed',
      score: '85%'
    },
    {
      id: '2',
      title: 'Cell Biology Research',
      subject: 'Biology',
      dueDate: 'May 18, 2025',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'World War II Essay',
      subject: 'History',
      dueDate: 'May 25, 2025',
      status: 'not-started'
    },
    {
      id: '4',
      title: 'Chemical Reactions',
      subject: 'Chemistry',
      dueDate: 'May 20, 2025',
      status: 'in-progress'
    }
  ];

  const filteredAssignments = assignments.filter(assignment => assignment.status === activeTab);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">My Assignments</h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <TabButton 
          active={activeTab === 'in-progress'} 
          onClick={() => setActiveTab('in-progress')}
          icon={<Clock size={20} />}
        >
          In Progress
        </TabButton>
        <TabButton 
          active={activeTab === 'completed'} 
          onClick={() => setActiveTab('completed')}
          icon={<CheckCircle size={20} />}
        >
          Completed
        </TabButton>
        <TabButton 
          active={activeTab === 'not-started'} 
          onClick={() => setActiveTab('not-started')}
          icon={<XCircle size={20} />}
        >
          Not Started
        </TabButton>
      </div>

      {/* Assignments Grid */}
      <div className="grid gap-4">
        {filteredAssignments.map(assignment => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
        {filteredAssignments.length === 0 && (
          <div className="text-center py-8">
            <Book size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No assignments in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ children, active, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-black text-white' 
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const getStatusColor = (status: AssignmentStatus) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50';
      case 'in-progress':
        return 'text-blue-500 bg-blue-50';
      case 'not-started':
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-gray-500">{assignment.subject}</div>
          <div className="font-medium">{assignment.title}</div>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(assignment.status)}`}>
          {assignment.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">
          <span className="text-gray-500">Due Date: </span>
          {assignment.dueDate}
        </div>
        <div className="flex items-center space-x-2">
          {assignment.score && <span className="font-medium">Score: {assignment.score}</span>}
          <button className="text-gray-600 hover:text-gray-900">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default MyAssignments;