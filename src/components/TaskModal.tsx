import React, { useState } from 'react';
import { Task } from '../data/tasks';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (isCorrect: boolean) => void;
  task: Task;
  onGiveUp: () => void; // Add this prop
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, task, onGiveUp }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    setHasSubmitted(true);
    setTimeout(() => {
      onSubmit(true); // Assuming the task is always completed correctly
      setHasSubmitted(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Task</h2>
        <p className="mb-4">{task.description}</p>
        {hasSubmitted && (
          <div className="mt-4 text-center font-bold text-green-500">
            Task Completed!
          </div>
        )}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onGiveUp}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Give Up
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={hasSubmitted}
          >
            Complete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;